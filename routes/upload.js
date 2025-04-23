const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// 📦 Configuration de multer pour le stockage local
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/"); // Le dossier où les fichiers seront stockés
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Génère un nom unique pour chaque fichier
  },
});

// 📜 Filtrage des types de fichiers
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpg|jpeg|png|webp/; // Types de fichiers acceptés
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true); // Si l'extension est correcte
  } else {
    cb("❌ Images uniquement (jpg, jpeg, png, webp)"); // Si ce n'est pas une image
  }
};

const upload = multer({ storage, fileFilter });

// 📤 Route d'upload
router.post("/", upload.single("image"), (req, res) => {
  res.json({ imageUrl: `/uploads/${req.file.filename}` }); // Retourne l'URL de l'image uploadée
});

module.exports = router;
