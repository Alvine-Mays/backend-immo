const express = require("express");
const router = express.Router();
const { loginUser, registerUser, getMe, refreshToken } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/login", loginUser);  // Route pour la connexion
router.post("/register", registerUser);  // Route pour l'inscription
router.get("/me", protect, getMe);  // Route pour obtenir les informations de l'utilisateur
router.post("/refresh-token", refreshToken);  // Nouvelle route pour rafraîchir le token

module.exports = router;
