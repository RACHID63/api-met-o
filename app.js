/* 
MON PROGRAMME :

> Je veux pouvoir afficher la météo pour une ville donnée

- 1. Récupérer la ville saisie par l'utilisateur
- 2. Envoyer une requête à l'API météo
- 3. Récupérer les données JSON
- 4. Afficher les informations de la ville sur ma page (HTML)
*/

/* ÉTAPE 1 : Récupérer la ville saisie par l'utilisateur */
const watchSubmit = () => {
  const form = document.querySelector("#form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const city = data.get("city");
    apiCall(city);
    console.log(city)
    });
};

/* ÉTAPE 2 : Envoyer une requête à l'API météo */
const apiCall = (city) => {
  fetch(
    `http://api.weatherstack.com/current?access_key=16719239aacea65434451cd9244166d4&query=${city}`
  )
    .then((response) => response.json())
    .then((data) => {
      /* ÉTAPE 3 : Récupérer les données JSON */
      const informationsNeeded = extractData(data);
      renderToHTML(informationsNeeded);
    })
    .catch((error) => {
      alert("An error occurred. Please try again later.");
      console.error(error);
    });
};

const extractData = (data) => {
  // 1 - Population
  const population = data.population;

  // 2 - Température
  const temperature = data.current.temperature;

  return {
    population: population,
    temperature: temperature,
  };
};

/* ÉTAPE 4 : Afficher les informations de la ville sur ma page (HTML) */
const renderToHTML = (data) => {
  const card = document.querySelector(".js-card");
  card.classList.remove("card--hidden");

  // Manipulation de textes avec la propriété textContent
  const city = document.querySelector(".js-card-city");
  city.textContent = data.population;
  const temperature = document.querySelector(".js-card-temperature");
  temperature.textContent = data.temperature;
};

// LANCEMENT DU PROGRAMME
watchSubmit();
