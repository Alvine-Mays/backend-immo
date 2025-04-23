const mongoose = require("mongoose");

const annonceSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
      trim: true, // Permet de supprimer les espaces superflus au début et à la fin
    },
    description: {
      type: String,
      trim: true, // Assurez-vous que la description ne contient pas d'espaces inutiles
    },
    prix: {
      type: Number,
      required: true,
    },
    ville: {
      type: String,
      trim: true,
    },
    adresse: {
      type: String,
      trim: true, // Ajoutez le trim pour nettoyer les espaces
    },
    categorie: {
      type: String,
      enum: ["Appartement", "Maison", "Terrain", "Commercial", "Autre"],
      default: "Autre", // Par défaut, si aucune catégorie n'est choisie, c'est "Autre"
    },
    images: {
      type: [String], // Permet de stocker plusieurs images pour chaque annonce
      default: [],
    },
    ratings: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    // Calculer la note moyenne des utilisateurs
    averageRating: { type: Number, default: 0 },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Cela lie l'annonce à un utilisateur spécifique
      required: true,
    },
    favoris: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Permet de gérer les favoris par utilisateur
      },
    ],
  },
  { timestamps: true } // Permet de créer des champs 'createdAt' et 'updatedAt'
);

module.exports = mongoose.model("Annonce", annonceSchema);
