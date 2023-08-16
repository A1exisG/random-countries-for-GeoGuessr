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

            randomCountryResult.innerHTML = `
                <img id="flag" src="https://flagcdn.com/${randomCountry.flag}.svg"/> 
                <span>${randomCountry.country}</span>`;

            randomCountryResult.style.visibility = " hidden";

            setTimeout(() => {
               randomCountryLoading.style.display = "none";
               randomCountryResult.style.visibility = "visible";
            }, 1000);
         });
      })
      .catch((error) => {
         console.error("Erreur lors du chargement du JSON :", error);
      });
});
