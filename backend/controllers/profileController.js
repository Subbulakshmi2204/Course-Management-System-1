const User = require("../models/User");

const fields = "name email department role createdAt";

async function getProfile(req, res, next) {
  try {
    const user = await User.findById(req.user.sub).select(fields);
    if (!user) return res.status(404).json({ message: "Profile not found" });
    res.json({ user });
  } catch (error) {
    next(error);
  }
}

// A user can only ever change their OWN profile (identity comes from the JWT).
async function updateProfile(req, res, next) {
  try {
    const updates = {};
    if (req.body.name !== undefined) updates.name = req.body.name.trim();
    if (req.body.department !== undefined) updates.department = req.body.department.trim();

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "Provide a name or department to update" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.sub,
      { $set: updates },
      { new: true, runValidators: true }
    ).select(fields);

    if (!user) return res.status(404).json({ message: "Profile not found" });
    res.json({ message: "Profile updated", user });
  } catch (error) {
    next(error);
  }
}

module.exports = { getProfile, updateProfile };
