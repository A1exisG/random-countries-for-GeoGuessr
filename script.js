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

            randomCountryLoading.style.display = "flex";
            randomCountryResult.innerHTML = "";

            setTimeout(() => {
               randomCountryLoading.style.display = "none";
               randomCountryResult.innerHTML = `
                <span>${randomCountry.emoji} ${randomCountry.country}</span>`;
            }, 1000);
         });
      })
      .catch((error) => {
         console.error("Erreur lors du chargement du JSON :", error);
      });
});
