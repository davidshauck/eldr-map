L.mapbox.accessToken = 'pk.eyJ1IjoiZGF2aWRzaGF1Y2siLCJhIjoiY2syZjU4eWFjMGdvbjNvbW8wN3NjZTJxaSJ9.ZHwNa6cWqC0ZdkAKX6YYCQ';
var geojson = [
    {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              -71.1167,
              42.3770
            ]
          },
          "properties": {
            "title": "Harvard University",
            "phoneFormatted": "(202) 234-7336",
            "phone": "2022347336",
            "address": "1471 P St NW",
            "city": "Cambridge",
            "country": "United States",
            "crossStreet": "at 15th St NW",
            "postalCode": "20005",
            "state": "MA"
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              -71.0802,
              42.3472
            ]
          },
          "properties": {
            "title": "Prudential Center",
            "phoneFormatted": "(202) 507-8357",
            "phone": "2025078357",
            "address": "2221 I St NW",
            "city": "Boston",
            "country": "United States",
            "crossStreet": "at 22nd St NW",
            "postalCode": "20037",
            "state": "MA"
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              -71.0972,
              42.3467
            ]
          },
          "properties": {
            "title": "Fenway Park",
            "phoneFormatted": "(202) 387-9338",
            "phone": "2023879338",
            "address": "1512 Connecticut Ave NW",
            "city": "Boston",
            "country": "United States",
            "crossStreet": "at Dupont Circle",
            "postalCode": "20036",
            "state": "MA"
          }
        },
        {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                -71.0547,
                42.3603
              ]
            },
            "properties": {
              "title": "Fanueil Hall",
              "phoneFormatted": "(202) 387-9338",
              "phone": "2023879338",
              "address": "1512 Connecticut Ave NW",
              "city": "Boston",
              "country": "United States",
              "crossStreet": "at Dupont Circle",
              "postalCode": "20036",
              "state": "MA."
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                -71.0942,
                42.3601
              ]
            },
            "properties": {
              "title": "MIT",
              "phoneFormatted": "(202) 387-9338",
              "phone": "2023879338",
              "address": "1512 Connecticut Ave NW",
              "city": "Cambridge",
              "country": "United States",
              "crossStreet": "at Dupont Circle",
              "postalCode": "20036",
              "state": "MA"
            }
          }
        
        
      ]
    }
];
var map = L.mapbox.map('map', 'mapbox.k8xv42t9')
.setView([42.3467, -71.0972], 12);

map.scrollWheelZoom.disable();

var listings = document.getElementById('listings');
var locations = L.mapbox.featureLayer().addTo(map);

locations.setGeoJSON(geojson);

function setActive(el) {
  var siblings = listings.getElementsByTagName('div');
  for (var i = 0; i < siblings.length; i++) {
    siblings[i].className = siblings[i].className
    .replace(/active/, '').replace(/\s\s*$/, '');
  }

  el.className += ' active';
}

locations.eachLayer(function(locale) {

  // Shorten locale.feature.properties to just `prop` so we're not
  // writing this long form over and over again.
  var prop = locale.feature.properties;

  // Each marker on the map.
  var popup = '<h3>' + prop.title + '</h3><div>' + prop.address;

  var listing = listings.appendChild(document.createElement('div'));
  listing.className = 'item';

  var link = listing.appendChild(document.createElement('a'));
  link.href = '#';
  link.className = 'title';

  link.innerHTML = prop.address;
  link.innerHTML = prop.title;
  if (prop.crossStreet) {
    link.innerHTML += '<br /><small class="quiet">' + prop.crossStreet + '</small>';
    popup += '<br /><small class="quiet">' + prop.crossStreet + '</small>';
  }

  var details = listing.appendChild(document.createElement('div'));
  details.innerHTML = prop.city;
  if (prop.phone) {
    details.innerHTML += ' &middot; ' + prop.phoneFormatted;
  }

  link.onclick = function() {
    setActive(listing);

    // When a menu item is clicked, animate the map to center
    // its associated locale and open its popup.
    map.setView(locale.getLatLng(), 12);
    locale.openPopup();
    return false;
  };

  // Marker interaction
  locale.on('click', function(e) {
    // 1. center the map on the selected marker.
    map.panTo(locale.getLatLng());

    // 2. Set active the markers associated listing.
    setActive(listing);
  });

  popup += '</div>';
  locale.bindPopup(popup);

  locale.setIcon(L.icon({
    iconUrl: 'assets/marker.png',
    iconSize: [56, 56],
    iconAnchor: [28, 28],
    popupAnchor: [0, -34]
  }));

});
