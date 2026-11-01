const express = require("express");
const Message = require("../models/Message");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const { isObjectId } = require("../validators/common");

const router = express.Router();

// People the logged-in user can chat with (names only - no emails or other details).
router.get("/contacts", authMiddleware, async (req, res, next) => {
  try {
    const contacts = await User.find({ _id: { $ne: req.user.sub } })
      .select("name role")
      .sort({ name: 1 })
      .limit(200)
      .lean();

    res.json({ contacts });
  } catch (error) {
    next(error);
  }
});

// Conversation between the logged-in user and :userId. Only the user's own
// messages can be read: myId always comes from the verified JWT.
router.get("/:userId", authMiddleware, async (req, res, next) => {
  try {
    const myId = req.user.sub;
    const otherId = req.params.userId;

    if (!isObjectId(myId) || !isObjectId(otherId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const messages = await Message.find({
      $or: [
        { sender: myId, recipient: otherId },
        { sender: otherId, recipient: myId },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    res.json({ messages: messages.reverse() });
  } catch (error) {
    next(error);
  }
});

module.exports = router;