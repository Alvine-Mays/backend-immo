const jwt = require("jsonwebtoken");
const User = require("../models/User");
const generateToken = require('../utils/generateToken'); // Correctement importé

// Génération du token JWT
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Durée plus longue que le JWT (ex : 30 jours)
  });
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token requis" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    // Vérifier si le refresh token correspond à l'utilisateur dans la base de données
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: "Token invalide" });
    }

    const token = generateToken(user._id);  // Nouveau JWT
    res.json({ token });
  } catch (error) {
    console.error("Erreur lors du rafraîchissement du token:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// @desc    Enregistrement utilisateur
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { nom, email, password } = req.body;

  if (!nom || !email || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "Cet utilisateur existe déjà." });
  }

  try {
    const user = await User.create({ nom, email, password });

    res.status(201).json({
      _id: user._id,
      nom: user.nom,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'enregistrement." });
  }
};

// @desc    Connexion utilisateur
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { nom: identifier }],
    });

    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé." });
    }

    const isMatch = await user.matchPassword(password);

    if (isMatch) {
      const token = generateToken(user._id);  // JWT
      const refreshToken = generateRefreshToken(user._id);  // Refresh token

      // Log des éléments avant d'envoyer la réponse
      console.log('Réponse envoyée à l\'utilisateur :', {
        _id: user._id,
        nom: user.nom,
        email: user.email,
        token,
        refreshToken,
      });

      // Stocker le refresh token dans la base de données (facultatif, mais recommandé)
      user.refreshToken = refreshToken;
      await user.save();

      res.json({
        _id: user._id,
        nom: user.nom,
        email: user.email,
        token,
        refreshToken, // Envoyer aussi le refresh token
      });
    } else {
      res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }
  } catch (error) {
    console.error("Erreur serveur :", error);
    res.status(500).json({ message: "Erreur serveur lors de la connexion." });
  }
};


// @desc    Profil de l'utilisateur connecté
// @route   GET /api/auth/me
// @access  Privé
const getMe = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(404).json({ message: "Utilisateur non trouvé." });
  }

  res.status(200).json({
    _id: user._id,
    nom: user.nom,
    email: user.email,
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  refreshToken,
};
