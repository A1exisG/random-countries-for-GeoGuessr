const express = require("express");
const cors = require("cors");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
const port = 3300;

app.use(cors());
app.use(express.static("public"));

app.get("/", function (req, res) {
   res.sendFile("public/index.html");
});

app.get("/api-data", async (req, res) => {
   try {
      // Tableau pour stocker les réponses
      let responseData = [];

      // Fonction pour effectuer une requête et concaténer les données
      const fetchData = async (page) => {
         const response = await fetch(`https://geoguessr.com/api/v3/social/maps/browse/popular/official?count=54&page=${page}`);
         const data = await response.json();
         responseData = responseData.concat(data);
      };

      // Effectuer les requêtes en parallèle
      const promises = [];
      for (let page = 0; page < 3; page++) {
         promises.push(fetchData(page));
      }

      // Attendre que toutes les réponses soient reçues
      await Promise.all(promises);

      // Envoyer le tableau contenant toutes les données
      res.json(responseData);
   } catch (error) {
      console.error("Erreur lors de la requête vers l'API externe :", error);
      res.status(500).json({ error: "Erreur lors de la requête vers l'API externe" });
   }
});

app.listen(port, () => {
   console.log(`Serveur proxy en cours d'exécution sur le port ${port}`);
});
