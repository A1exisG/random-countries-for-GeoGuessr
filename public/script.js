document.addEventListener("DOMContentLoaded", function () {
   const randomPartyButton = document.getElementById("randomPartyButton");
   const loader = document.getElementById("loader");
   const resultContainer = document.getElementById("resultContainer");

   const resultMap = document.querySelector(".map");
   const resultOptions = document.querySelector(".options");
   const result = document.querySelector(".result");

   randomPartyButton.addEventListener("click", () => {
      resultMap.innerHTML = "";
      resultOptions.innerHTML = "";
      result.style.display = "none";

      // Fonction générique pour gérer l'affichage en fonction de l'état de la case à cocher
      function toggleDisplay(checkbox, generateFunction) {
         if (checkbox.checked) {
            generateFunction();
         }
      }

      // Utilisation de la fonction pour gérer chaque cas
      toggleDisplay(document.getElementById("map"), generateRandomMap);
      toggleDisplay(document.getElementById("time"), () => generateRandomTime(10, 600));
      toggleDisplay(document.getElementById("moving"), generateRandomMove);
      toggleDisplay(document.getElementById("panning"), generateRandomPan);
      toggleDisplay(document.getElementById("zooming"), generateRandomZoom);

      randomPartyButton.disabled = true;
      randomPartyButton.style.cursor = "not-allowed";
      randomPartyButton.style.background = "#4a4a4a";
      loader.style.display = "flex";

      setTimeout(() => {
         loader.style.display = "none";
         randomPartyButton.disabled = false;
         randomPartyButton.style.cursor = "initial";
         randomPartyButton.style.background = "#6cb928";
         result.style.display = "flex";
      }, 1000);
   });

   function generateRandomMap() {
      const proxyUrl = "/api-data";

      fetch(proxyUrl)
         .then((response) => {
            if (response.ok) {
               return response.json();
            } else {
               throw new Error("Erreur lors de la récupération des données depuis le serveur proxy");
            }
         })
         .then((data) => {
            // console.log("Données reçues depuis le serveur proxy :", data);
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomMap = data[randomIndex];

            resultMap.innerHTML = `                        
               <img src="https://www.geoguessr.com/images/auto/220/220/ce/0/plain/${randomMap.images.backgroundLarge}" alt="Image of ${randomMap.name}" />
               <div>
                  <span class="name">${randomMap.name} <a href="https://www.geoguessr.com${randomMap.url}" target="_blank"><img src="./img/ext-link-icon.svg" alt="External Link Icon"/> </a></span>
                  <div class="difficulty">
                     <img src="./img/difficulty-${randomMap.difficultyLevel}.svg" alt="Icon difficulty ${randomMap.difficultyLevel}" />
                     <span>${randomMap.difficulty} <span>AVG. SCORE ${randomMap.averageScore}</span></span>
                  </div>
                  <div class="coordinate-count">
                     <img src="./img/location-icon.svg" alt="Icon of earth with pin" />
                     <span>${randomMap.coordinateCount} <span>LOCATIONS</span></span>
                  </div>
               </div>
                         `;
         })
         .catch((error) => {
            console.error("Erreur lors de la requête vers le serveur proxy :", error);
         });
   }

   function generateRandomTime(xMin, xMax) {
      // Générer un nombre aléatoire entre xMin/10 et xMax/10
      const randomMultipleOf10 = Math.floor(Math.random() * (xMax / 10 - xMin / 10 + 1)) + xMin / 10;

      // Calculer les minutes et les secondes
      const minutes = Math.floor(randomMultipleOf10 / 6);
      const seconds = (randomMultipleOf10 % 6) * 10;

      // Construire le résultat en fonction des minutes et secondes
      let result = "";

      if (minutes > 0) {
         result += `${minutes} min `;
      }

      if (seconds > 0 || minutes === 0) {
         result += `${seconds} sec`;
      }

      resultOptions.innerHTML += `
      <div>
         <img src="./img/time-limit.png" alt="Icon time limit" />
         <span>${result}</span>
      </div>
      `;

      // return formattedDuration;
   }

   function generateRandomMove() {
      const moving = Math.random() < 0.5;

      if (moving === true) {
         resultOptions.innerHTML += `
         <div>
            <img src="./img/moving-allowed.png" alt="Icon moving allowed" />
            <span>moving allowed</span>
         </div>
         `;
      } else if (moving == false) {
         resultOptions.innerHTML += `
         <div>
            <img src="./img/no-move.png" alt="Icon no move" />
            <span>no move</span>
         </div>
         `;
      }
   }

   function generateRandomPan() {
      const panning = Math.random() < 0.5;

      if (panning === true) {
         resultOptions.innerHTML += `
         <div>
            <img src="./img/panning-allowed.png" alt="Icon panning allowed" />
            <span>panning allowed</span>
         </div>
         `;
      } else if (panning == false) {
         resultOptions.innerHTML += `
         <div>
            <img src="./img/no-pan.png" alt="Icon no pan" />
            <span>no pan</span>
         </div>
         `;
      }
   }

   function generateRandomZoom() {
      const zooming = Math.random() < 0.5;

      if (zooming === true) {
         resultOptions.innerHTML += `
         <div>
            <img src="./img/zooming-allowed.png" alt="Icon zooming allowed" />
            <span>zooming allowed</span>
         </div>
         `;
      } else if (zooming == false) {
         resultOptions.innerHTML += `
         <div>
            <img src="./img/no-zoom.png" alt="Icon no zoom" />
            <span>no zoom</span>
         </div>
         `;
      }
   }
});

// Gérer la modal pour la tools bar mobile

const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");
const modal = document.getElementById("modal");

openBtn.addEventListener("click", () => {
   modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
   modal.style.display = "none";
});

// Sélectionnez les cases à cocher
const mapCheckbox = document.getElementById("map");
const timeCheckbox = document.getElementById("time");
const movingCheckbox = document.getElementById("moving");
const panningCheckbox = document.getElementById("panning");
const zoomingCheckbox = document.getElementById("zooming");

// Fonction pour enregistrer l'état de la case à cocher dans le localStorage
function saveCheckboxState(checkbox) {
   localStorage.setItem(checkbox.id, checkbox.checked);
}

// Fonction pour charger l'état de la case à cocher depuis le localStorage
function loadCheckboxState(checkbox) {
   const savedState = localStorage.getItem(checkbox.id);
   if (savedState !== null) {
      checkbox.checked = savedState === "true"; // Convertir la chaîne en booléen
   }
}

// Chargez l'état des cases à cocher lors du chargement de la page
loadCheckboxState(mapCheckbox);
loadCheckboxState(timeCheckbox);
loadCheckboxState(movingCheckbox);
loadCheckboxState(panningCheckbox);
loadCheckboxState(zoomingCheckbox);

// Écoutez les changements d'état des cases à cocher et enregistrez-les
mapCheckbox.addEventListener("change", () => {
   saveCheckboxState(mapCheckbox);
});

timeCheckbox.addEventListener("change", () => {
   saveCheckboxState(timeCheckbox);
});

movingCheckbox.addEventListener("change", () => {
   saveCheckboxState(movingCheckbox);
});

panningCheckbox.addEventListener("change", () => {
   saveCheckboxState(panningCheckbox);
});

zoomingCheckbox.addEventListener("change", () => {
   saveCheckboxState(zoomingCheckbox);
});
