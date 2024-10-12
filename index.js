const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');  // Utilise require pour node-fetch v2

const app = express();

// Middleware
app.use(cors());
app.use(express.static('public'));

// Route par défaut (pour servir le frontend)
app.get("/", (req, res) => {
   res.sendFile(__dirname + '/public/index.html');
});

// API pour récupérer des données depuis GeoGuessr
app.get("/api-data", async (req, res) => {
   try {
      let responseData = [];

      const fetchData = async (page) => {
         const response = await fetch(`https://geoguessr.com/api/v3/social/maps/browse/popular/official?count=54&page=${page}`);
         const data = await response.json();
         responseData = responseData.concat(data);
      };

      const promises = [];
      for (let page = 0; page < 3; page++) {
         promises.push(fetchData(page));
      }

      await Promise.all(promises);

      res.json(responseData);
   } catch (error) {
      console.error("Erreur lors de la requête vers l'API externe :", error);
      res.status(500).json({ error: "Erreur lors de la requête vers l'API externe" });
   }
});

// Exportation de l'application pour Vercel
module.exports = app;  // Pas de app.listen(), Vercel gère cela pour toi
