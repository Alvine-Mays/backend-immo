const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { protect } = require("../middlewares/authMiddleware");
const { getMe } = require("../controllers/userController");
const User = require("../models/User");

const router = express.Router();

// Middleware de validation pour l'inscription
const validateRegister = [
  check("email").isEmail().withMessage("Email invalide"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Le mot de passe doit contenir au moins 8 caractères"),
];

// ✅ Route protégée pour récupérer les infos de l'utilisateur
router.get("/me", protect, getMe);

// ✅ Route d'inscription
router.post("/register", validateRegister, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password, nom } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Cet utilisateur existe déjà." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, nom });
    await user.save();

    res.status(201).json({ message: "Utilisateur créé avec succès." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ✅ Route de connexion avec email ou nom
router.post("/login", async (req, res) => {
  try {
    console.log("Requête de connexion :", req.body); // Voir ce qui est envoyé par le mobile
    const user = await User.findOne({
      $or: [{ email: identifier }, { nom: identifier }],
    });
    // console.log("Utilisateur trouvé :", user);

    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé." });
    }

    // Vérification du mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    // Génération du token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Réponse avec le token et les informations de l'utilisateur
    res.json({
      token,
      userId: user._id,
      nom: user.nom,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.put("/:id", protect, async (req, res) => {
  const { id } = req.params;
  const { nom, email } = req.body; // Paramètres à mettre à jour

  try {
    // Vérifie si l'utilisateur existe
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Si l'utilisateur n'est pas le bon (par exemple, en cas de tentative de modification par un autre utilisateur)
    if (user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Accès interdit. Vous ne pouvez pas modifier ce profil." });
    }

    // Met à jour les informations disponibles
    if (nom) user.nom = nom;
    if (email) user.email = email;

    // Sauvegarde les modifications
    await user.save();

    // Réponse avec les nouvelles données de l'utilisateur
    res.status(200).json({
      _id: user._id,
      nom: user.nom,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur lors de la mise à jour." });
  }
});
module.exports = router;
