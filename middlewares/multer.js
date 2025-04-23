const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary"); // Assurez-vous que cloudinary est bien configuré

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "immo_annonces", // Dossier dans Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"], // Types de fichiers acceptés
  },
});

const upload = multer({ storage }); // Cette ligne définit le middleware Multer

module.exports = upload;
