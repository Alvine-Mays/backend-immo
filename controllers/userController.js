// controllers/userController.js
const User = require("../models/User");

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password").populate({
      path: "favoris",
      populate: { path: "user", select: "nom email" },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
  }
}; 
module.exports = { getMe };


