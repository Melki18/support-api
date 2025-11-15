require("dotenv").config();
const mongoose = require("mongoose");

// ✅ Chemin correct vers ton modèle
const RequestType = require("../src/models/RequestType");

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/support-api";

const seeds = [
  {
    code: "TECH_ISSUE",
    name: "Problème technique",
    description: "Bug technique",
    category: "tech",
    priority: "high",
  },
  {
    code: "BILLING_Q",
    name: "Question facturation",
    description: "Facture",
    category: "billing",
  },
  {
    code: "ACCOUNT_CHANGE",
    name: "Modification compte",
    description: "Demande utilisateur",
    category: "user",
  },
  {
    code: "FEATURE_REQ",
    name: "Demande fonctionnalité",
    description: "Nouvelle idée",
    category: "product",
  },
  {
    code: "COMPLAINT",
    name: "Réclamation",
    description: "Plainte",
    category: "support",
    priority: "critical",
  },
];

async function run() {
  try {
    console.log("Connexion à MongoDB sur :", MONGO_URI);
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connecté à MongoDB !");

    // Vérification que le modèle est bien chargé
    if (!RequestType || !RequestType.countDocuments) {
      throw new Error(
        "Le modèle RequestType n’a pas été chargé correctement !",
      );
    }

    const countBefore = await RequestType.countDocuments();
    console.log("Documents avant insertion :", countBefore);

    // On vide la collection
    await RequestType.deleteMany({});
    console.log("Collection vidée");

    // Insertion des seeds
    const result = await RequestType.insertMany(seeds);
    console.log("Données insérées :", result.length);

    const countAfter = await RequestType.countDocuments();
    console.log("Documents après insertion :", countAfter);

    await mongoose.disconnect();
    console.log("Déconnecté de MongoDB");
  } catch (err) {
    console.error("Erreur lors du seed :", err);
  }
}

run();