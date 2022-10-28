const fetchData = async () => {
  const city = document.getElementById('inputCity').value;
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&include=current&key=FB6NKGAMVR6Q69SQZ5KPFZZ8S&contentType=json`,
    {
      method: 'GET',
      headers: {},
    }
  );

  // error
  if (!response.ok) {
    document.getElementById('weather').innerHTML = `
        <div class="error" role="alert">
            Ville introuvable, êtes vous sûr de l'orthographe ?
        </div>  
    `;
  }

  const { currentConditions } = await response.json();

  const {
    conditions,
    datetime,
    feelslike,
    humidity,
    winddir,
    windspeed,
    visibility,
    pressure,
  } = currentConditions;

  document.getElementById('weather').innerHTML = `
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Météo actuelle pour ${city}</h5>
            <p class="card-text">Conditions: ${conditions}</p>
            <p class="card-text">Date: ${datetime}</p>
            <p class="card-text">Ressenti: ${feelslike}</p>
            <p class="card-text">Humidité: ${humidity}</p>
            <p class="card-text">Direction du vent: ${winddir}</p>
            <p class="card-text">Vitesse du vent: ${windspeed}</p>
            <p class="card-text">Visibilité: ${visibility}</p>
            <p class="card-text">Préssion: ${pressure}</p>
        </div>
    </div>
    `;
};
