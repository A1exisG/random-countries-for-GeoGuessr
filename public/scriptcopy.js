document.addEventListener("DOMContentLoaded", function () {
   const randomPartyButton = document.getElementById("randomPartyButton");
   const loader = document.getElementById("loader");
   const resultContainer = document.getElementById("resultContainer");

   const resultMap = document.querySelector(".map");
   const resultOptions = document.querySelector(".options");
   const result = document.querySelector(".result");

   randomPartyButton.addEventListener("click", () => {
      // resultMap.style.display = "none";
      // resultOptions.style.display = "none";
      resultMap.innerHTML = "";
      resultOptions.innerHTML = "";
      result.style.display = "none";

      // function handleOption(optionId, resultContainerId, generateFunction) {
      //    const optionCheckbox = document.getElementById(optionId);
      //    const resultContainer = document.getElementById(resultContainerId);

      //    if (optionCheckbox.checked) {
      //       generateFunction();
      //       resultContainer.style.display = "flex";
      //    } else {
      //       resultContainer.style.display = "none";
      //    }
      // }

      // if (window.innerWidth >= 800) {
      //    handleOption("country", "randomCountryResult", generateRandomCountry);
      //    handleOption("time", "timeContainer", () => generateRandomTime(10, 600));
      //    handleOption("moving", "movingContainer", generateRandomMove);
      //    handleOption("panning", "panningContainer", generateRandomPan);
      //    handleOption("zooming", "zoomingContainer", generateRandomZoom);
      // } else {
      //    handleOption("country-m", "randomCountryResult", generateRandomCountry);
      //    handleOption("time-m", "timeContainer", () => generateRandomTime(10, 600));
      //    handleOption("moving-m", "movingContainer", generateRandomMove);
      //    handleOption("panning-m", "panningContainer", generateRandomPan);
      //    handleOption("zooming-m", "zoomingContainer", generateRandomZoom);
      // }

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
      randomPartyButton.style.backgroundImage = "radial-gradient(150% 160% at 50% 15%, hsla(0, 0%, 100%, 0.6) 0, transparent 30%)";
      loader.style.display = "flex";

      setTimeout(() => {
         loader.style.display = "none";
         randomPartyButton.disabled = false;
         randomPartyButton.style.cursor = "initial";
         randomPartyButton.style.background = "#6cb928";
         randomPartyButton.style.backgroundImage = "radial-gradient(150% 160% at 50% 15%, hsla(0, 0%, 100%, 0.6) 0, transparent 30%)";
         // resultMap.style.display = "flex";
         // resultOptions.style.display = "flex";
         result.style.display = "flex";
      }, 1000);
   });

   // function generateRandomCountry() {
   //    fetch("countries.json")
   //       .then((response) => response.json())
   //       .then((countries) => {
   //          const randomIndex = Math.floor(Math.random() * countries.length);
   //          const randomCountry = countries[randomIndex];

   //          randomCountryResult.innerHTML = `
   //              <img id="flag" src="https://flagcdn.com/${randomCountry.flag}.svg" alt="flag of ${randomCountry.country}" class="prevent-select"/>
   //              <span>${randomCountry.country}</span>`;
   //       });
   // }

   function generateRandomMap() {
      const proxyUrl = "http://127.0.0.1:3000/api-data";

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
                  <span class="name">${randomMap.name}</span>
                  <div class="difficulty">
                     <img src="./img/difficulty-${randomMap.difficultyLevel}.svg" alt="Icon difficulty ${randomMap.difficultyLevel}" />
                     <span>${randomMap.difficulty}</span>
                     <span>AVG. SCORE ${randomMap.averageScore}</span>
                  </div>
                  <div class="coordinate-count">
                     <img src="./img/location-icon.svg" alt="Icon of earth with pin" />
                     <span>${randomMap.coordinateCount}</span>
                     <span>LOCATIONS</span>
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
            <img src="./img/no-pan.png" alt="Icon no zoom" />
            <span>no zoom</span>
         </div>
         `;
      }
   }
});

// Gérer la modal pour la tools bar mobile

// const openBtn = document.getElementById("openModal");
// const closeBtn = document.getElementById("closeModal");
// const modal = document.getElementById("modal");

// openBtn.addEventListener("click", () => {
//    modal.classList.add("open");
// });

// closeBtn.addEventListener("click", () => {
//    modal.classList.remove("open");
// });

// function detachDivOnSmallScreen() {
//    if (window.innerWidth <= 800) {
//       $(".toolsbar").detach();
//    } else {
//       // Réattacher la div à la fin du body lorsque la largeur est supérieure à 800px
//       $("body").append($(".toolsbar"));
//    }
// }

// // Appeler la fonction initiale et ajouter un écouteur d'événement pour redéclencher
// // lorsque la taille de l'écran change
// detachDivOnSmallScreen();
// $(window).on("resize", detachDivOnSmallScreen);
