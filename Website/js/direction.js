var style = [{
  'id': 'directions-route-line-alt',
  'type': 'line',
  'source': 'directions',
  'layout': {
    'line-cap': 'round',
    'line-join': 'round'
  },
  'paint': {
    'line-color': '#888',
    'line-width': {
        'base': 10,
        'stops': [[0, 0], [15, 5], [18, 25]]
    }
  },
  'filter': [
    'all',
    ['in', '$type', 'LineString'],
    ['in', 'route', 'alternate']
  ]
}, {
  'id': 'directions-route-line',
  'type': 'line',
  'source': 'directions',
  'layout': {
    'line-cap': 'round',
    'line-join': 'round'
},
  'paint': {
    'line-color': '#FF0000',
    'line-dasharray': [0, 2],
    'line-width': {
        'base': 10,
        'stops': [[0, 0], [15, 5], [18, 25]]
    }
  },
  'filter': [
    'all',
    ['in', '$type', 'LineString'],
    ['in', 'route', 'selected']
  ]
}, {
  'id': 'directions-hover-point-casing',
  'type': 'circle',
  'source': 'directions',
  'paint': {
    'circle-radius': 8,
    'circle-color': '#fff'
  },
  'filter': [
    'all',
    ['in', '$type', 'Point'],
    ['in', 'id', 'hover']
  ]
}, {
  'id': 'directions-hover-point',
  'type': 'circle',
  'source': 'directions',
  'paint': {
    'circle-radius': 6,
    'circle-color': '#000'
  },
  'filter': [
    'all',
    ['in', '$type', 'Point'],
    ['in', 'id', 'hover']
  ]
}, {
  'id': 'directions-waypoint-point-casing',
  'type': 'circle',
  'source': 'directions',
  'paint': {
    'circle-radius': 8,
    'circle-color': '#fff'
  },
  'filter': [
    'all',
    ['in', '$type', 'Point'],
    ['in', 'id', 'waypoint']
  ]
}, {
  'id': 'directions-waypoint-point',
  'type': 'circle',
  'source': 'directions',
  'paint': {
    'circle-radius': 6,
    'circle-color': '#8a8bc9'
  },
  'filter': [
    'all',
    ['in', '$type', 'Point'],
    ['in', 'id', 'waypoint']
  ]
}, {
  'id': 'directions-origin-point',
  'type': 'circle',
  'source': 'directions',
  'paint': {
    'circle-radius': 12,
    'circle-color': '#3bb2d0'
  },
  'filter': [
    'all',
    ['in', '$type', 'Point'],
    ['in', 'marker-symbol', 'A']
  ]
}, {
  'id': 'directions-origin-label',
  'type': 'symbol',
  'source': 'directions',
  'layout': {
    'text-field': 'B',
    'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
    'text-size': 12
  },
  'filter': [
    'all',
    ['in', '$type', 'Point'],
    ['in', 'marker-symbol', 'A']
  ]
}, {
  'id': 'directions-destination-point',
  'type': 'circle',
  'source': 'directions',
  'paint': {
    'circle-radius': 12,
    'circle-color': '#FF0000'
  },
  'filter': [
    'all',
    ['in', '$type', 'Point'],
    ['in', 'marker-symbol', 'B']
  ]
}, {
  'id': 'directions-destination-label',
  'type': 'symbol',
  'source': 'directions',
  'layout': {
    'text-field': 'B',
    'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
    'text-size': 12
  },
  'paint': {
    'text-color': '#fff'
  },
  'filter': [
    'all',
    ['in', '$type', 'Point'],
    ['in', 'marker-symbol', 'B']
  ]
}];

mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbndpZHlhbiIsImEiOiJjaXpvNmx6OXQwMDE0MnFucTJhODNzcnJzIn0.17aFDly4h5iOl-o_21e4yw';

var layerIDs = ['restaurant', 'toilet', 'hospital', 'seat', 'merchandise', 'stand'];
var filterInput = document.getElementById('filter-input');

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ivanwidyan/cj1oocv30003q2so152mtuqkb',
    bearing: -180,
    center: [2.313198, 48.857085],
    zoom: 16.5,
    pitch: 60
});

var directions = new MapboxDirections({
    styles: style,
    accessToken: mapboxgl.accessToken,
    unit: 'metric',
    profile: 'walking',
    controls: {
        inputs: false
    }
});

map.addControl(directions, 'top-right');
map.addControl(new mapboxgl.GeolocateControl(), 'top-left');

/*map.on('load', () => {
  button.addEventListener('click', function() {
    map.removeWaypoint();
  });

  removeWaypointsButton.addEventListener('click', function() {
    directions.removeRoutes();
  });
});*/

map.on('load', function() {
    map.addSource("paris_circuit", {
        type: "vector",
        url: "mapbox://ivanwidyan.cj14q3c35000933pao3nxtdv0-8sjc0"
    });

    map.addLayer({
        "id": 'paris_circuit',
        "type": 'line',
        "source": "paris_circuit",
        "source-layer": 'Circuit_Des_Invalides',
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#6dbae3",
            "line-width": {
                'base': 10,
                'stops': [[0, 0], [15, 10], [18, 50]]
            }
        },
        "filter": ["==", "name", "circuit"]
        }, "road-rail"
    );
    map.addLayer({
        "id": 'paris_pit_lane',
        "type": 'line',
        "source": "paris_circuit",
        "source-layer": 'Circuit_Des_Invalides',
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#6dbae3",
            "line-width": {
                'base': 5,
                'stops': [[0, 0], [15, 5], [18, 25]]
            }
        },
        "filter": ["==", "name", "pit_lane"]
    }, "road-rail"
    );
    map.addLayer({
        "id": 'paris_circuit_white',
        "type": 'line',
        "source": "paris_circuit",
        "source-layer": 'Circuit_Des_Invalides',
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#fff",
            "line-width": {
                'base': 2,
                'stops': [[12, 0], [15, 2], [18, 6]]
            },
            "line-blur": 1
        },
        "filter": ["==", "name", "circuit"]
        }, "road-rail"
    );
    map.addLayer({
        "id": "paris_TV",
        "type": "symbol",
        "source": "paris_circuit",
        "source-layer": 'Circuit_Des_Invalides',
        "layout": {
            "icon-image": "square-15",
            "icon-size": {
                'base': 1.5,
                'stops': [[0, 0], [15, 0.75], [18, 2.25]]
            },
            "text-field": "TV",
            "text-size": {
                'base': 8,
                'stops': [[0, 0], [15, 10], [18, 20]]
            },
            "icon-allow-overlap": true,
            "text-allow-overlap": true
        },
        "paint": {
            "text-color": "#0B5C78"
        },
        "filter": ["==", "name", "TV"]
    });
    map.addLayer({
        "id": "toilet",
        "type": "symbol",
        "source": "paris_circuit",
        "source-layer": 'Circuit_Des_Invalides',
        "layout": {
            "icon-image": "toilet-11",
            "icon-size": {
                'base': 1.5,
                'stops': [[0, 0], [15, 0.75], [18, 2.25]]
            },
            "icon-allow-overlap": true
        },
        "filter": ["==", "name", "toilet"]
    });
    map.addLayer({
        "id": "restaurant",
        "type": "symbol",
        "source": "paris_circuit",
        "source-layer": 'Circuit_Des_Invalides',
        "layout": {
            "icon-image": "restaurant-11",
            "icon-size": {
                'base': 1.5,
                'stops': [[0, 0], [15, 0.75], [18, 2.25]]
            },
            "icon-allow-overlap": true
        },
        "filter": ["==", "name", "restaurant"]
    });
    map.addLayer({
        "id": "hospital",
        "type": "symbol",
        "source": "paris_circuit",
        "source-layer": 'Circuit_Des_Invalides',
        "layout": {
            "icon-image": "hospital-11",
            "icon-size": {
                'base': 1.5,
                'stops': [[0, 0], [15, 0.75], [18, 2.25]]
            },
            "icon-allow-overlap": true
        },
        "filter": ["==", "name", "medic"]
    });
    map.addLayer({
        "id": "merchandise",
        "type": "symbol",
        "source": "paris_circuit",
        "source-layer": 'Circuit_Des_Invalides',
        "layout": {
            "icon-image": "clothing-store-11",
            "icon-size": {
                'base': 1.5,
                'stops': [[0, 0], [15, 0.75], [18, 2.25]]
            },
            "icon-allow-overlap": true
        },
        "filter": ["==", "name", "merchandise"]
    });
    map.addLayer({
        "id": "paris_start",
        "type": "symbol",
        "source": "paris_circuit",
        "source-layer": 'Circuit_Des_Invalides',
        "layout": {
            "icon-image": "circle-11",
            "icon-size": {
                'base': 1.5,
                'stops': [[0, 0], [15, 0.75], [18, 1.5]]
            },
            "text-field": "Start",
            "text-offset": [0, -1],
            "text-size": {
                'base': 1.5,
                'stops': [[0, 0], [15, 15], [18, 30]]
            }
        },
        "filter": ["==", "name", "start"]
    });
    map.addLayer({
        "id": "paris_T",
        "type": "symbol",
        "source": "paris_circuit",
        "source-layer": 'Circuit_Des_Invalides',
        "layout": {
            "icon-image": "circle-11",
            "icon-size": {
                'base': 0.75,
                'stops': [[0, 0], [15, 0.75], [18, 1.5]]
            },
            "text-field": "{details}",
            "text-offset": [0, -1],
            "text-size": {
                'base': 15,
                'stops': [[0, 0], [15, 15], [18, 30]]
            }
        },
        "filter": ["==", "name", "T"]
    });
    map.addLayer({
        'id': 'seat',
        'source': 'paris_circuit',
        'source-layer': 'Circuit_Des_Invalides',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
            'fill-extrusion-color': '#FF0000',
            'fill-extrusion-height': 15,
            'fill-extrusion-base': 0,
            'fill-extrusion-opacity': 0.5
        },
         "filter": ["==", "name", "seat"]
    });
    map.addLayer({
        'id': 'stand',
        'source': 'paris_circuit',
        'source-layer': 'Circuit_Des_Invalides',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
            'fill-extrusion-color': '#00FF00',
            'fill-extrusion-height': 15,
            'fill-extrusion-base': 0,
            'fill-extrusion-opacity': 0.5
        },
         "filter": ["==", "name", "stand"]
    });
    map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
            'fill-extrusion-color': '#ebf5fa',
            'fill-extrusion-height': {
                'type': 'identity',
                'property': 'height'
            },
            'fill-extrusion-base': {
                'type': 'identity',
                'property': 'min_height'
            },
            'fill-extrusion-opacity': 0.25
        }
    },'paris-circuit');

    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mouseenter', 'stand', function (e) {
        map.getCanvas().style.cursor = 'pointer';
        popup.setLngLat(e.lngLat)
            .setHTML("<img src=" + e.features[0].properties.photo +
                    " width='150px' height='auto' margin='0'><h6 align=center>" + 
                    e.features[0].properties.details + 
                    "</h6><p align=center>" + 
                    e.features[0].properties.description + 
                    "</p>")
            .addTo(map);
    });
    map.on('mouseleave', 'stand', function () {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });

    var pointsId = ['restaurant', 'merchandise'];
    for (var i = 0; i < pointsId.length; i++) {
        var id = pointsId[i];
        map.on('mousemove', id, function(e) {
            map.getCanvas().style.cursor = 'pointer';
            popup.setLngLat(e.features[0].geometry.coordinates)
                .setHTML("<img src=" + e.features[0].properties.photo +
                    " width='150px' height='auto' margin='0'><h6 align=center>" + 
                    e.features[0].properties.details + 
                    "</h6><p align=center>" + 
                    e.features[0].properties.description + 
                    "</p>")
                .addTo(map);
        });

        map.on('mouseleave', id, function() {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });
    }
});

filterInput.addEventListener('keyup', function(e) {
    var value = e.target.value.trim().toLowerCase();
    layerIDs.forEach(function(layerID) {
        map.setLayoutProperty(layerID, 'visibility',
            layerID.indexOf(value) > -1 ? 'visible' : 'none');
    });
});

var toggleableLayerIds = [ 'toilet', 'restaurant', 'hospital', 'merchandise'];
for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.getElementById(id);
    var legendsName = link.getElementsByTagName("p");

    link.onclick = function (e) {
        var clickedLayer = this.id;
        var legendsName = this.getElementsByTagName("p");

        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            legendsName[0].className = '';
        } else {
            legendsName[0].className = 'text-gradient';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };
}