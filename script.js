document.addEventListener("DOMContentLoaded", function () {
   const randomCountryButton = document.getElementById("randomCountryButton");
   const randomCountryResult = document.getElementById("randomCountryResult");
   const randomCountryLoading = document.getElementById("loader");
   const timeContainer = document.getElementById("timeContainer");
   const movingContainer = document.getElementById("movingContainer");
   const panningContainer = document.getElementById("panningContainer");
   const zoomingContainer = document.getElementById("zoomingContainer");
   const resultContainer = document.getElementById("resultContainer");

   randomCountryButton.addEventListener("click", () => {
      resultContainer.style.display = "none";

      if (document.getElementById("countrie").checked) {
         generateRandomCountrie();
         randomCountryResult.style.display = "flex";
      } else {
         randomCountryResult.style.display = "none";
      }
      if (document.getElementById("time").checked) {
         generateRandomTime(10, 600);
         timeContainer.style.display = "flex";
      } else {
         timeContainer.style.display = "none";
      }
      if (document.getElementById("moving").checked) {
         generateRandomMove();
         movingContainer.style.display = "flex";
      } else {
         movingContainer.style.display = "none";
      }
      if (document.getElementById("panning").checked) {
         generateRandomPan();
         panningContainer.style.display = "flex";
      } else {
         panningContainer.style.display = "none";
      }
      if (document.getElementById("zooming").checked) {
         generateRandomZoom();
         zoomingContainer.style.display = "flex";
      } else {
         zoomingContainer.style.display = "none";
      }

      randomCountryButton.disabled = true;
      randomCountryButton.style.cursor = "not-allowed";
      randomCountryButton.style.background = "#4a4a4a";
      randomCountryButton.style.backgroundImage = "radial-gradient(150% 160% at 50% 15%, hsla(0, 0%, 100%, 0.6) 0, transparent 30%)";
      randomCountryLoading.style.display = "flex";

      setTimeout(() => {
         randomCountryLoading.style.display = "none";
         randomCountryButton.disabled = false;
         randomCountryButton.style.cursor = "initial";
         randomCountryButton.style.background = "#6cb928";
         randomCountryButton.style.backgroundImage = "radial-gradient(150% 160% at 50% 15%, hsla(0, 0%, 100%, 0.6) 0, transparent 30%)";
         resultContainer.style.display = "flex";
      }, 1000);
   });

   function generateRandomCountrie() {
      fetch("countries.json")
         .then((response) => response.json())
         .then((countries) => {
            const randomIndex = Math.floor(Math.random() * countries.length);
            const randomCountry = countries[randomIndex];

            randomCountryResult.innerHTML = `
                <img id="flag" src="https://flagcdn.com/${randomCountry.flag}.svg" alt="flag of ${randomCountry.country}" class="prevent-select"/> 
                <span>${randomCountry.country}</span>`;
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

      timeContainer.innerHTML = `<img src="src/time-limit.png" alt="Icon time limit" style="height: 30px" />
      ${result}`;

      // return formattedDuration;
   }

   function generateRandomMove() {
      const moving = Math.random() < 0.5;

      if (moving === true) {
         movingContainer.innerHTML = `<img src="src/moving-allowed.png" alt="Icon moving allowed" style="height: 30px"/>
         moving allowed`;
      } else if (moving == false) {
         movingContainer.innerHTML = `<img src="src/no-move.png" alt="Icon no move" style="height: 30px"/>
         no move`;
      }
   }

   function generateRandomPan() {
      const panning = Math.random() < 0.5;

      if (panning === true) {
         panningContainer.innerHTML = `<img src="src/panning-allowed.png" alt="Icon panning allowed" style="height: 30px"/>
         panning allowed`;
      } else if (panning == false) {
         panningContainer.innerHTML = `<img src="src/no-pan.png" alt="Icon no pan" style="height: 30px"/>
         no pan`;
      }
   }

   function generateRandomZoom() {
      const zooming = Math.random() < 0.5;

      if (zooming === true) {
         zoomingContainer.innerHTML = `<img src="src/zooming-allowed.png" alt="Icon zooming allowed" style="height: 30px"/>
         zooming allowed`;
      } else if (zooming == false) {
         zoomingContainer.innerHTML = `<img src="src/no-zoom.png" alt="Icon no zoom" style="height: 30px"/>
         no zoom`;
      }
   }
});
