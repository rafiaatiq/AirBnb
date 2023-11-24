 
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
container: 'map', // container ID
// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
style: 'mapbox://styles/mapbox/streets-v12', // style URL
center: listing.geometry.coordinates, // starting position [lng, lat]
zoom: 8 // starting zoom
});

// console.log(coordinates);

// Create a default Marker and add it to the map.
const marker = new mapboxgl.Marker({ color: 'red' })
.setLngLat(listing.geometry.coordinates) //Listing.geometry.coordinates
.setPopup(new mapboxgl.Popup({offset:25}).setHTML(`<h5>${listing.location}</h5> <p>Excat Location provided after Booking</p>`))

.addTo(map);
 
// Create a default Marker, colored black, rotated 45 degrees.
// const marker2 = new mapboxgl.Marker({ color: 'black', rotation: 45 })
// .setLngLat([12.65147, 55.608166])
// .addTo(map);