$(function(){
    $(".dropdown").hover(            
        function() {
            $('.dropdown-menu', this).stop( true, true ).fadeIn("fast");
            $(this).toggleClass('open');
            $('span', this).toggleClass("caret caret-up");                
        },
        function() {
            $('.dropdown-menu', this).stop( true, true ).fadeOut("fast");
            $(this).toggleClass('open');
            $('span', this).toggleClass("caret caret-up");                
    });
});

$('#myCarousel').carousel({
  interval: 5000
})

$('#map').affix({
      	offset: {
        top: function () {
            var navOuterHeight = $("#myCarousel").height();
            return this.top = navOuterHeight;
        },
        bottom: function () {
            return (this.bottom = $("#belowMap").outerHeight(true));
        }
    }
});

mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbndpZHlhbiIsImEiOiJjaXpvNmx6OXQwMDE0MnFucTJhODNzcnJzIn0.17aFDly4h5iOl-o_21e4yw';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ivanwidyan/cj1i588hk00002so4nps9zb4h',
    bearing: -90,
  	center: [7.425183, 43.735326],
  	zoom: 15.5,
  	pitch: 60
});

map.scrollZoom.disable();

map.on('load', function() {
	/* ADD SOURCES */
	map.addSource("monaco_circuit", {
	    type: "vector",
	    url: "mapbox://ivanwidyan.cj1eqouvk000a2wrvoqxjnwd0-3coja"
	});
	map.addSource("paris_circuit", {
	    type: "vector",
	    url: "mapbox://ivanwidyan.cj14q3c35000933pao3nxtdv0-8sjc0"
	});
	map.addSource("berlin_circuit", {
	    type: "vector",
	    url: "mapbox://ivanwidyan.cj1buxg5o00662qpi7a33dwee-0e72m"
	});

	/* MONACO CIRCUIT */
	map.addLayer({
    	"id": 'monaco_circuit',
    	"type": 'line',
    	"source": "monaco_circuit",
    	"source-layer": 'Circuit_of_Monaco',
    	"layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#099FB8",
            "line-width": 10
        },
        "filter": ["==", "name", "circuit"]
    });
    map.addLayer({
        "id": 'monaco_pit_lane',
        "type": 'line',
        "source": "monaco_circuit",
        "source-layer": 'Circuit_of_Monaco',
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#099FB8",
            "line-width": {
                'base': 5,
                'stops': [[0, 0], [15, 5]]
            }
        },
        "filter": ["==", "name", "pit_lane"]
    });
    map.addLayer({
        "id": "monaco_start",
        "type": "symbol",
        "source": "monaco_circuit",
        "source-layer": 'Circuit_of_Monaco',
        "layout": {
        	"icon-image": "dot-10",
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
        "paint": {
            "text-color": "#fff"
        },
        "filter": ["==", "name", "start"]
    });
    map.addLayer({
        "id": "monaco_T",
        "type": "symbol",
        "source": "monaco_circuit",
        "source-layer": 'Circuit_of_Monaco',
        "layout": {
        	"icon-image": "dot-10",
        	"icon-size": {
                'base': 1.5,
                'stops': [[0, 0], [15, 0.75], [18, 1.5]]
            },
            "text-field": "{details}",
            "text-offset": [0, -1],
            "text-size": {
            	'base': 1.5,
                'stops': [[0, 0], [15, 15], [18, 30]]
            }
        },
        "paint": {
            "text-color": "#fff"
        },
        "filter": ["==", "name", "T"]
    });

	/* PARIS CIRCUIT */
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
            "line-color": "#099FB8",
            "line-width": {
            	'base': 10,
                'stops': [[0, 0], [15, 10]]
            }
        },
        "filter": ["==", "name", "circuit"]
    });
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
            "line-color": "#099FB8",
            "line-width": {
            	'base': 5,
                'stops': [[0, 0], [15, 5]]
            }
        },
        "filter": ["==", "name", "pit_lane"]
    });

    map.addLayer({
        "id": "paris_start",
        "type": "symbol",
        "source": "paris_circuit",
        "source-layer": 'Circuit_Des_Invalides',
        "layout": {
        	"icon-image": "dot-10",
        	"icon-size": {
                'base': 1.5,
                'stops': [[0, 0], [15, 0.75]]
            },
            "text-field": "Start",
            "text-offset": [0, -1],
            "text-size": {
            	'base': 1.5,
                'stops': [[0, 0], [15, 15]]
            }
        },
        "paint": {
            "text-color": "#fff"
        },
        "filter": ["==", "name", "start"]
    });
    map.addLayer({
        "id": "paris_T",
        "type": "symbol",
        "source": "paris_circuit",
        "source-layer": 'Circuit_Des_Invalides',
        "layout": {
        	"icon-image": "dot-10",
        	"icon-size": {
                'base': 1.5,
                'stops': [[0, 0], [15, 0.75]]
            },
            "text-field": "{details}",
            "text-offset": [0, -1],
            "text-size": {
            	'base': 1.5,
                'stops': [[0, 0], [15, 15]]
            }
        },
        "paint": {
            "text-color": "#fff"
        },
        "filter": ["==", "name", "T"]
    });

    /* BERLIN CIRCUIT */
	map.addLayer({
    	"id": 'berlin_circuit',
    	"type": 'line',
    	"source": "berlin_circuit",
    	"source-layer": 'Circuit_of_Berlin',
    	"layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#099FB8",
            "line-width": 10
        },
        "filter": ["==", "name", "circuit"]
    });
    map.addLayer({
        "id": 'berlin_pit_lane',
        "type": 'line',
        "source": "berlin_circuit",
        "source-layer": 'Circuit_of_Berlin',
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#099FB8",
            "line-width": {
                'base': 5,
                'stops': [[0, 0], [15, 5]]
            }
        },
        "filter": ["==", "name", "pit_lane"]
    });
    map.addLayer({
        "id": "berlin_start",
        "type": "symbol",
        "source": "berlin_circuit",
        "source-layer": 'Circuit_of_Berlin',
        "layout": {
        	"icon-image": "dot-10",
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
        "paint": {
            "text-color": "#fff"
        },
        "filter": ["==", "name", "start"]
    });
    map.addLayer({
        "id": "berlin_T",
        "type": "symbol",
        "source": "berlin_circuit",
        "source-layer": 'Circuit_of_Berlin',
        "layout": {
        	"icon-image": "dot-10",
        	"icon-size": {
                'base': 1.5,
                'stops': [[0, 0], [15, 0.75], [18, 1.5]]
            },
            "text-field": "{details}",
            "text-offset": [0, -1],
            "text-size": {
            	'base': 1.5,
                'stops': [[0, 0], [15, 15], [18, 30]]
            }
        },
        "paint": {
            "text-color": "#fff"
        },
        "filter": ["==", "name", "T"]
    });
});

var chapters = {
  	'monaco': {
  		duration: 5000,
      	bearing: -90,
      	center: [7.425183, 43.735326],
      	zoom: 15.5,
      	pitch: 60
  	},
  	'paris': {
      	duration: 5000,
      	bearing: -180,
      	center: [2.313198, 48.857085],
      	zoom: 15.5,
      	pitch: 60
  	},
  	'berlin': {
  		duration: 5000,
      	bearing: -90,
      	center: [13.425860, 52.518952],
      	zoom: 15.5,
      	pitch: 60
  	}
};

window.onscroll = function() {
  var chapterNames = Object.keys(chapters);
  for (var i = 0; i < chapterNames.length; i++) {
      	var chapterName = chapterNames[i];
      	if (isElementOnScreen(chapterName)) {
          	setActiveChapter(chapterName);
          	break;
      }
  }
};

var activeChapterName = 'monaco';
function setActiveChapter(chapterName) {
  	if (chapterName === activeChapterName) return;
 	map.flyTo(chapters[chapterName]);

  	activeChapterName = chapterName;
}

function isElementOnScreen(id) {
  	var element = document.getElementById(id);
  	var bounds = element.getBoundingClientRect();
  	return (bounds.top * 2) < window.innerHeight && bounds.bottom > (window.innerHeight / 2);
  	// return bounds.top < window.innerHeight && bounds.bottom > 0;
}