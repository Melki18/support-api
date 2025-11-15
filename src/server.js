require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const requestTypesRouter = require("./routes/requestTypes");

const app = express();
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/request-types", requestTypesRouter);

const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/support-api";

let server;

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    server = app.listen(PORT, () =>
      console.log(`Serveur démarré sur le port ${PORT}`),
    );
    return server;
  } catch (err) {
    console.error("Erreur lors de la connexion à MongoDB :", err);
    process.exit(1);
  }
}

async function stop() {
  if (server) {
    await new Promise((resolve) => server.close(resolve));
    console.log(" Serveur arrêté");
  }
  await mongoose.disconnect();
}

if (require.main === module) start();

module.exports = { app, start, stop };
