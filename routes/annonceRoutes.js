// backend/routes/annonceRoutes.js
const express = require("express");
const router = express.Router();
const {
  creerAnnonce,
  getAllAnnonces,
  getAnnonceById,
  updateAnnonce,
  deleteAnnonce,
  toggleFavori,
  rateAnnonce, // Assurez-vous que cette route est importée ici
  getAnnonceWithRating, // Ajouter cette route pour récupérer les notes de l'utilisateur
} = require("../controllers/annonceController");

// Auth middleware
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multer");

// Routes pour les annonces
router.get("/", protect, getAllAnnonces);  // Récupérer toutes les annonces
router.post("/", protect, upload.array("images[]", 10), creerAnnonce);  // Créer une annonce
router.get("/:id", protect, getAnnonceById);  // Récupérer une annonce par ID
router.put("/:id", protect, upload.array("images[]", 10), updateAnnonce);  // Mettre à jour une annonce
router.delete("/:id", protect, deleteAnnonce);  // Supprimer une annonce
router.post("/favoris/:id", protect, toggleFavori);  // Ajouter/retirer des favoris
router.post("/rate/:id", protect, rateAnnonce);  // Route pour mettre à jour la note
router.get("/rating/:id", protect, getAnnonceWithRating);  // Route pour récupérer la note d'une annonce

module.exports = router;
