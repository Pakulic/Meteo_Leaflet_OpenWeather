/* d'après la documentation https://leafletjs.com/reference-1.7.1.html#map-example
L.map(<HTMLElement> el, <Map options> options?) 	
=> Afficher un objet map donné dans une balise HTML <div> et des options d'affichage (Map options).
// on appelle la div d'affichage au sein de la fonction "L.map". Pas besoin de document.queryselector car la fonction le fait.*/
const MAP = L.map('affichage').setView([-2.029284, -9.5780797], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(MAP);

// on déclare les constantes pour les deux boutons
const LOC = document.querySelector('#localisation');
const BTNMAPMARKER = document.querySelector('#marqueur');

// puis on ajoute les évenements au clic sur les boutons :
// évenement au clic sur le bouton de géolocalisation
LOC.addEventListener('click', () => {
	// récupérer les données de géolocalisation du navigateur
	navigator.geolocation.getCurrentPosition(success, error);
});
// évenement au clic sur le bouton d'ajout de marqueur
BTNMAPMARKER.addEventListener('click', () => {
	// change la class css à chaque clic
	BTNMAPMARKER.classList.toggle('active');
});


// évenement au clic sur la map
MAP.addEventListener('click', e => {
	// lorsque le bouton "ajout de marqueur est activé" (class css active)
	if (BTNMAPMARKER.classList.contains('active')) {
		/* la document de Leaflet  https://leafletjs.com/examples/quick-start/
		précise comment récupérer les coordonnées de l'évenement (clic)=> avec e.latlng. On fait ensuite un "console.log" pour voir comment récupèrer la longitude et la latitude :
		console.log(e.latlng); */
		//  je récupère les coordonnées de l'événement et je les ajoute au marqueur "L.marker" et à la map "addTo(Map)":
		let mapMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(MAP);
		// j'éxecute la fonction getMeteo qui va récuperer les informations de météi via une API sur openweathermap
		getMeteo(mapMarker, e.latlng.lat, e.latlng.lng);
	}
});

// LES FONCTIONS
// fonction en cas de succès de géolocalisation
function success(pos) {
	// je selectionne les coordonnées dans les informations de positions
	let coord = pos.coords;
	// je déclare une variable pour la latitude et une pour la longitude
	let lat = coord.latitude;
	let long = coord.longitude;
	//je créeé un marqueur pour les coordonnées et le rajouter dans la map
	//https://leafletjs.com/reference-0.7.7.html#marker
	let marker = L.marker(L.latLng(lat, long)).addTo(MAP);
	// je centre la vue de la map sur les coordonnées
	MAP.setView([lat, long], 13);
	// j'éxecute la fonction getMeteo qui va récuperer les informations de météi via une API sur openweathermap
	getMeteo(marker, lat, long);
}

// fonction en cas d'erreur de géolocalisation
function error(err) {
	console.warn(`ERREUR (${err.code}): ${err.message}`);
}

// fonction qui va chercher les information sur openweathermap
function getMeteo(marker, lat, long) {
	//collecter les informations météo via l'API pour ses coordonnées
	fetch(
		// `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=c8e87e8006e651c90643bfc35c5ebeae`,
	)
		// si j'obients une réponse, je mets les réponses en .json
		.then(response => response.json())
		//puis j'execute la fonction suivante
		.then(response => {
			// console.log(response);
			// j'appelle la fonction setpopup qui va afficher ma pop-up et son contenu
			setpopup(marker, response, lat, long);
		})
		// en cas d'erreur, j'affiche l'erreur dans la console
		.catch(err => {
			console.warn(err);
		});
}

// je créé une fonction pour afficher la popup
function setpopup(marker, response, lat, long) {
	// je déclare deux variables pour simplifier l'appel des informations (réponses) dans la pop-up
	let meteo = response.weather[0];
	let main = response.main;
	// documentation pour l'icone =>  https://openweathermap.org/weather-conditions
	marker.bindPopup(`
  <article class="popup">
  <h2>Ville : ${response.name}</h2>
  <p>Latitude : ${lat}</p>
  <p>Latitude : ${long}</p>
  <div class='icone'>
    <img  src="http://openweathermap.org/img/wn/${meteo.icon}.png" alt="icone météo">
  </div>
  <ul>
  <li><p>Météo : ${meteo.main}</p></li>
  <li><p>Détails météo : ${meteo.description}</p></li>
  <li><p>Température : ${main.temp}</p></li>
  <li><p>Humidité : ${main.humidity}</p></li>
  <li><p>Pression : ${main.pressure}</p></li>
  <li><p>Vent : ${response.wind.speed}</p></li>
  </ul>
  </article>`);
}
