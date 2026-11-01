const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Message = require("../models/Message");
const Notification = require("../models/Notification");
const { getAllowedOrigins } = require("./allowedOrigins");
const { isObjectId } = require("../validators/common");

// Errors the client is allowed to see; anything else becomes a generic message.
function clientError(message) {
  const error = new Error(message);
  error.clientSafe = true;
  return error;
}

// Simple per-socket limit: 30 messages per minute.
const MAX_MESSAGES = 30;
const WINDOW_MS = 60 * 1000;

function initializeSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: { origin: getAllowedOrigins(), methods: ["GET", "POST"] },
  });

  // Reject unauthenticated sockets before they connect.
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth && socket.handshake.auth.token;
      if (!token) return next(new Error("Authentication required"));

      const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ["HS256"] });
      const user = await User.findById(decoded.sub).select("_id name role");
      if (!user) return next(new Error("User not found"));

      socket.user = { id: String(user._id), name: user.name, role: user.role };
      next();
    } catch (error) {
      next(new Error("Invalid authentication token"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.user.id;
    socket.join(`user:${userId}`); // private room per user
    console.log("Socket connected:", userId);

    let sentAt = [];

    socket.on("send_message", async (data, ack) => {
      const reply = typeof ack === "function" ? ack : () => {};
      try {
        const now = Date.now();
        sentAt = sentAt.filter((time) => now - time < WINDOW_MS);
        if (sentAt.length >= MAX_MESSAGES) throw clientError("You are sending messages too fast");
        sentAt.push(now);

        const { recipientId, text } = data || {};
        if (!isObjectId(recipientId) || typeof text !== "string" || !text.trim() || text.trim().length > 2000) {
          throw clientError("Invalid message data");
        }
        if (recipientId === userId) throw clientError("You cannot message yourself");

        if (!(await User.exists({ _id: recipientId }))) throw clientError("Recipient not found");

        // The sender comes from the authenticated socket - never from the client.
        const message = await Message.create({ sender: userId, recipient: recipientId, text: text.trim() });

        io.to(`user:${userId}`).to(`user:${recipientId}`).emit("receive_message", {
          _id: message._id,
          sender: userId,
          recipient: recipientId,
          text: message.text,
          createdAt: message.createdAt,
        });

        const notification = await Notification.create({
          recipient: recipientId,
          message: `New message from ${socket.user.name}`,
        });

        io.to(`user:${recipientId}`).emit("new_notification", {
          _id: notification._id,
          recipient: String(notification.recipient),
          message: notification.message,
          isRead: notification.isRead,
          createdAt: notification.createdAt,
        });

        reply({ success: true });
      } catch (error) {
        if (!error.clientSafe) console.error("send_message failed:", error);
        reply({ success: false, message: error.clientSafe ? error.message : "Unable to send message" });
      }
    });

    socket.on("disconnect", () => console.log("Socket disconnected:", userId));
  });

  return io;
}

module.exports = initializeSocket;