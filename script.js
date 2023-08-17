document.addEventListener("DOMContentLoaded", function () {
   const randomCountryButton = document.getElementById("randomCountryButton");
   const randomCountryResult = document.getElementById("randomCountryResult");
   const randomCountryLoading = document.getElementById("loader");

   // Charger les données JSON en utilisant Fetch
   fetch("countries.json")
      .then((response) => response.json())
      .then((countries) => {
         randomCountryButton.addEventListener("click", () => {
            const randomIndex = Math.floor(Math.random() * countries.length);
            const randomCountry = countries[randomIndex];

            randomCountryButton.disabled = true;
            randomCountryButton.style.cursor = "not-allowed";
            randomCountryButton.style.background = "#4a4a4a";
            randomCountryButton.style.backgroundImage = "radial-gradient(150% 160% at 50% 15%, hsla(0, 0%, 100%, 0.6) 0, transparent 30%)";
            randomCountryLoading.style.display = "flex";

            randomCountryResult.innerHTML = `
                <img id="flag" src="https://flagcdn.com/${randomCountry.flag}.svg"/> 
                <span>${randomCountry.country}</span>`;

            randomCountryResult.style.display = "none";

            setTimeout(() => {
               randomCountryLoading.style.display = "none";
               randomCountryResult.style.display = "flex";
               randomCountryButton.disabled = false;
               randomCountryButton.style.cursor = "initial";
               randomCountryButton.style.background = "#6cb928";
               randomCountryButton.style.backgroundImage = "radial-gradient(150% 160% at 50% 15%, hsla(0, 0%, 100%, 0.6) 0, transparent 30%)";
            }, 1000);
         });
      })
      .catch((error) => {
         console.error("Erreur lors du chargement du JSON :", error);
      });
});
