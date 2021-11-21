```Rappel : On utilise JS pour manipuler le DOM (Document Object Model) -> contenu de la page HTML, vu comme un arbre par JS.

1.	Créez une page HTML incluant un bouton Me Localiser et une carte interactive OpenStreetMap avec Leaflet.js. Design libre.

a.	Créez une page HTML contenant une div qui occupe la totalité de l’espace disponible (en largeur, hauteur, et sans bordures ni marges)

b.	Ajoutez à votre HTML le CSS de Leaflet :
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
   crossorigin=""/>

Et le JS :
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
crossorigin=""></script>

c.	Intégrez une carte LeafletJS dans cette div en vous appuyant sur la documentation et en utilisant ce code :
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

d.	Ajoutez un bouton Me Localiser, qui peut intégrer une icône FontAwesome. rendez-vous à cette URL : https://fontawesome.com/start et suivez les instructions pour recevoir votre Kit FontAwesome à intégrer sur votre projet.

2.	En utilisant navigator.geolocation, ajouter un événement au bouton qui récupère, au clic de l’utilisateur, ses coordonnées GPS, crée un marqueur sur la carte, et zoom dessus.
a.	Sélectionnez le bouton en tant qu’élément HTML
b.	Ajoutez un écouteur d’événement click.
c.	Utilisez l’API navigator pour récupérer les coordonnées GPS de l’utilisateur : https://developer.mozilla.org/fr/docs/Web/API/Geolocation/getCurrentPosition 
d.	Utilisez les coordonnées récupérées pour créer un marqueur : https://leafletjs.com/reference-1.7.1.html#marker 
3.	Ajoutez le bulletin météo au marker créé.

a.	En utilisant la documentation Leaflet  https://leafletjs.com/reference-1.7.1.html#popup , ajoutez au marker créé une popup contenant les coordonnées GPS récupérées précédemment.
b.	Utilisez fetch() pour interroger l’API https://openweathermap.org/current et récupérer le bulletin météo à ces coordonnées GPS. (Clé API : c8e87e8006e651c90643bfc35c5ebeae)
c.	En utilisant les méthodes du DOM, ajoutez le bulletin météo dans la popup générée au point a.
	
4.	BONUS : 
a.	Créez un autre bouton Ajouter Marqueur qui, seulement quand il est actif, récupère au clic utilisateur sur la carte, les coordonnées de l'endroit ciblé (documentation Leaflet). 
b.	Créez un marqueur à cet endroit.
c.	Interrogez l'API openweathermap.org pour obtenir le bulletin météo de ce lieu.
d.	Ajoutez le bulletin à la popup de ce marqueur.```


