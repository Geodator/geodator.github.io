// Karte erstellen (mit "FullScreen-Button")
var map = L.map('map',{
	attributionControl: true,
	zoomControl: false,
	fullscreenControl: true,
	fullscreenControlOptions: {
		position: 'topleft'}
	})
	.setView([51.84000, 12.22930], 17);
	
// Maßstabsleiste
var scaleoptions = {
	maxWidth: 100,
	imperial: true,
}	
L.control.scale(scaleoptions).addTo(map);
	
// Lizenzverweis
var attrib='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
	'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +	
	'Imagery © <a href="http://mapbox.com">Mapbox</a>';	
	
// Plug In: FuseSearch (durchsucht GeoJSON)
var SearchOptions = {
	position: 'topright',
	title: 'Suche',
	placeholder: 'Suche',
	//maxResultLength: null,
	//threshold: 0.5,
	showInvisibleFeatures: false,
	showResultFct: function(feature, container) {
        var name = L.DomUtil.create('b', null, container);
        name.innerHTML = feature.properties.name;
        container.appendChild(L.DomUtil.create('br', 'searchcontent', container));
		
		// entfernt Lücken, wenn keine Straße angegebn ist
		if (feature.properties.str){
				container.appendChild(document.createTextNode(feature.properties.str));
				container.appendChild(L.DomUtil.create('br', 'searchcontent', container));
			}							
		container.appendChild(document.createTextNode(feature.properties.typ));				
    }
};

var searchCtrl = L.control.fuseSearch(SearchOptions);
map.addControl(searchCtrl);
	
// OSM BaseLayers
var osmLayer = L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
	maxZoom: 20,
	attribution: attrib,
	id: 'examples.map-i875mjb7'
}).addTo(map);				
var osmLayerGray = L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
	maxZoom: 20,
	attribution: attrib,
	id: 'examples.map-20v6611k'
});	
// Google Maps
var googleLayerRoad = new L.Google('ROADMAP', {
	detectRetina: true});		
var googleLayerHybrid = new L.Google('HYBRID', {
	detectRetina: true});
var googleLayerSatellit = new L.Google('SATELLITE', {
	detectRetina: true});
	
// individuelle Marker
// http://fortawesome.github.io/Font-Awesome/icons/)
// mögliche Farben: red,darkred,orange,green,darkgreen,blue,purple,darkpurple,cadetblue,darkblue
var behoerdenMarker = L.AwesomeMarkers.icon( 	{icon: 'institution',prefix: 'fa',markerColor: 'darkpurple',iconColor: 'white',spin: false});
var bankMarker = L.AwesomeMarkers.icon( 		{icon: 'eur',prefix: 'fa',markerColor: 'darkred',iconColor: 'white',spin: false});
var postMarker = L.AwesomeMarkers.icon( 		{icon: 'envelope',prefix: 'fa',markerColor: 'orange',iconColor: 'white',spin: false});
var fahrradMarker = L.AwesomeMarkers.icon( 		{icon: 'bicycle',prefix: 'fa',markerColor: 'purple',iconColor: 'white',spin: false});
var einkaufMarker = L.AwesomeMarkers.icon( 		{icon: 'shopping-cart',prefix: 'fa',markerColor: 'orange',iconColor: 'white',spin: false});
var essenMarker = L.AwesomeMarkers.icon( 		{icon: 'cutlery',prefix: 'fa',markerColor: 'blue',iconColor: 'white',spin: false});
var baeckerMarker = L.AwesomeMarkers.icon( 		{icon: 'coffee',prefix: 'fa',markerColor: 'cadetblue',iconColor: 'white',spin: false});
var bierMarker = L.AwesomeMarkers.icon( 		{icon: 'beer',prefix: 'fa',markerColor: 'darkblue',iconColor: 'white',spin: false});
var barMarker = L.AwesomeMarkers.icon( 			{icon: 'glass',prefix: 'fa',markerColor: 'darkblue',iconColor: 'white',spin: false});
var cafeMarker = L.AwesomeMarkers.icon( 		{icon: 'coffee',prefix: 'fa',markerColor: 'cadetblue',iconColor: 'white',spin: false});
var shoppingMarker = L.AwesomeMarkers.icon( 	{icon: 'shopping-cart',prefix: 'fa',markerColor: 'purple',iconColor: 'white',spin: false});
var gruenMarker = L.AwesomeMarkers.icon( 		{icon: 'child',prefix: 'fa',markerColor: 'green',iconColor: 'white',spin: false});
var apothekeMarker = L.AwesomeMarkers.icon( 	{icon: 'plus-square',prefix: 'fa',markerColor: 'red',iconColor: 'white',spin: false});
var arztMarker = L.AwesomeMarkers.icon( 		{icon: 'medkit',prefix: 'fa',markerColor: 'red',iconColor: 'white',spin: false});
var ambulanzMarker = L.AwesomeMarkers.icon( 	{icon: 'ambulance',prefix: 'fa',markerColor: 'red',iconColor: 'white',spin: false});
var buhaMarker = L.AwesomeMarkers.icon( 		{icon: 'bus',prefix: 'fa',markerColor: 'green',iconColor: 'white',spin: false});
var strabaMarker = L.AwesomeMarkers.icon( 		{icon: 'bus',prefix: 'fa',markerColor: 'green',iconColor: 'white',spin: false});
var hbfMarker = L.AwesomeMarkers.icon( 			{icon: 'bus',prefix: 'fa',markerColor: 'green',iconColor: 'white',spin: false});
var sightseeingMarker = L.AwesomeMarkers.icon(	{icon: 'camera',prefix: 'fa',markerColor: 'purple',iconColor: 'white',spin: false});
var kinoMarker = L.AwesomeMarkers.icon( 		{icon: 'film',prefix: 'fa',markerColor: 'darkblue',iconColor: 'white',spin: false});
var kulturMarker = L.AwesomeMarkers.icon( 		{icon: 'institution',prefix: 'fa',markerColor: 'darkblue',iconColor: 'white',spin: false});
var sportMarker = L.AwesomeMarkers.icon( 		{icon: 'futbol-o',prefix: 'fa',markerColor: 'darkgreen',iconColor: 'white',spin: false});
var hssportMarker = L.AwesomeMarkers.icon( 		{icon: 'futbol-o',prefix: 'fa',markerColor: 'green',iconColor: 'white',spin: false});
var parkenMarker = L.AwesomeMarkers.icon( 		{icon: 'car',prefix: 'fa',markerColor: 'orange',iconColor: 'white',spin: false});	
var badMarker = L.AwesomeMarkers.icon( 			{icon: 'life-ring',prefix: 'fa',markerColor: 'blue',iconColor: 'white',spin: false});	
var bauhausMarker = L.AwesomeMarkers.icon( 		{icon: 'camera',prefix: 'fa',markerColor: 'purple',iconColor: 'white',spin: false});	


// Overlay-Layer (LayerGroups anlegen), beim Laden nur Gebäude und Wohhnheime zu erkennen
var lg_gebaeude = new L.LayerGroup().addTo(map);
var lg_wohnheime = new L.LayerGroup().addTo(map);
var lg_post = new L.LayerGroup().addTo(map);
var lg_bank = new L.LayerGroup().addTo(map);
var lg_bike = new L.LayerGroup().addTo(map);
var lg_amt = new L.LayerGroup().addTo(map);
var lg_bar = new L.LayerGroup().addTo(map);
var lg_cafe = new L.LayerGroup().addTo(map);
var lg_shopping = new L.LayerGroup().addTo(map);
var lg_gruenanl = new L.LayerGroup().addTo(map);
var lg_kino = new L.LayerGroup().addTo(map);
var lg_restaur = new L.LayerGroup().addTo(map);
var lg_sight = new L.LayerGroup().addTo(map);
var lg_theater = new L.LayerGroup().addTo(map);
var lg_aerzte = new L.LayerGroup().addTo(map);
var lg_Apotheke = new L.LayerGroup().addTo(map);
var lg_krankenhaus = new L.LayerGroup().addTo(map);
var lg_buha = new L.LayerGroup().addTo(map);
var lg_bhf = new L.LayerGroup().addTo(map);
var lg_straba = new L.LayerGroup().addTo(map);
var lg_baecker = new L.LayerGroup().addTo(map);
var lg_imbiss = new L.LayerGroup().addTo(map);
var lg_markt = new L.LayerGroup().addTo(map);
var lg_sport = new L.LayerGroup().addTo(map);
var lg_hssport = new L.LayerGroup().addTo(map);
var lg_pp = new L.LayerGroup().addTo(map);
var lg_mensa = new L.LayerGroup().addTo(map);
var lg_museum = new L.LayerGroup().addTo(map);
var lg_bad = new L.LayerGroup().addTo(map);
var lg_bauhaus = new L.LayerGroup().addTo(map);

// Abstand zum Rand, Breite vom Popup
var popupOptions  =  { 
                            maxWidth: 215,
							minWidth: 50,
							autoPanPadding: [50,15]
					 };										 

// prüft ob Link in GeoJson angegeben ist und erzeugt entsprechenden Link + entfernt Lücken, wenn Straße nicht vorhanden ist
function pruefung(feature, layer) 
{							
	var text;
	var text2
	if (!feature.properties.popuptext)
		text = "";
			else
		{
			if (feature.properties.typ == "DessauHbf"||feature.properties.typ == "Bushaltestelle"||feature.properties.typ == "Straßenbahn - Haltestelle")
				text = "<br/> <a href="+feature.properties.popuptext+">Fahrplan</a>";
					else
				text = "<br/> <a href="+feature.properties.popuptext+">Homepage</a>";
		}
	
	if (!feature.properties.str)
		text2 = "";
			else
		text2 = "<br/>";	
	
	feature.layer = layer;
	layer.bindPopup("<b>"+feature.properties.name+"</b>"+text2+feature.properties.str + text,popupOptions )
}		
	
// GeoJSON für Infrastruktur/ Dienstleistungen laden	  
var load = $.getJSON("data/POI.geojson");
    load.then(function(data) {
        var bank = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.typ == "Banken";
            },
			onEachFeature: pruefung,						
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: bankMarker
                })
            }
        });		
		var fahrrad = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.typ == "Fahrradladen";
            },
			onEachFeature: pruefung,
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: fahrradMarker
                })
            }
        });		
		var post = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.typ == "Post";
            },
			onEachFeature: pruefung,
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: postMarker
                })
            }
        });		
        var amt = L.geoJson(data, {
			filter: function(feature, layer) {
                return feature.properties.typ == "Behörden";
            },
			onEachFeature: pruefung,
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: behoerdenMarker
                })
            }
        });		
        var bar = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.typ == "Bars";
            },
			onEachFeature: pruefung,
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: bierMarker
                })
            }
        });	
		var cafe = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.typ == "Cafe";
            },
			onEachFeature: pruefung,
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: barMarker
                })
            }
        });		
		var shopping = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.typ == "Einkaufsmöglichkeiten";
            },
			onEachFeature: pruefung,
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: shoppingMarker
                })
            }
        });
		var gruenanl = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.typ == "Grünanlage";
            },
			onEachFeature: pruefung,
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: gruenMarker
                })
            }
        });
		var kino = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.typ == "Kino";
            },
			onEachFeature: pruefung,
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: kinoMarker
                })
            }
        });
		var restaur = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.typ == "Restaurants";
            },
			onEachFeature: pruefung,
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: essenMarker
                })
            }
        });
		var sight = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.typ == "Sehenswürdigkeiten";
            },
			onEachFeature: pruefung,
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: sightseeingMarker
                })
            }
        });
		var theater = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.typ == "Theater";
            },
			onEachFeature: pruefung,
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: kulturMarker
                })
            }
        });
        var pp = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.typ == "Hochschul-Parkplätze";
            },
			onEachFeature: pruefung,
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: parkenMarker
                })
            }
        });
        var aerzte = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.typ == "Ärzte";
            },
			onEachFeature: pruefung,
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: arztMarker
                })
            }
		});
		var apotheke = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.typ == "Apotheke";
            },
			onEachFeature: pruefung,
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: apothekeMarker
                })
                }
			});
		var krankenhaus = L.geoJson(data, {
			filter: function(feature, layer) {
                return feature.properties.typ == "Krankenhaus";
            },
			onEachFeature: pruefung,
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: ambulanzMarker
                })
            }
        });
        var buha = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.typ == "Bushaltestelle";
            },
			onEachFeature: pruefung,
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: buhaMarker
                })
            }
        });
		var bhf = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.typ == "DessauHbf";
            },
			onEachFeature: pruefung,
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: hbfMarker
                })
            }
        });		
		var straba = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.typ == "Straßenbahn - Haltestelle";
            },
			onEachFeature: pruefung,
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: strabaMarker
                })
            }
        });
        var sport = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.typ == "Sport";
            },
			onEachFeature: pruefung,
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: sportMarker
                })
            }
        });
		var hssport = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.typ == "Hochschulsport";
            },
			onEachFeature: pruefung,
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: hssportMarker
                })
            }
        });
        var baecker = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.typ == "Bäckerei";
            },
			onEachFeature: pruefung,
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: baeckerMarker
                })
            }
        });		
		var imbiss = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.typ == "Imbiss";
            },
			onEachFeature: pruefung,
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: essenMarker
                })
            }
        });				
        var markt = L.geoJson(data, {
			filter: function(feature, layer) {
                return feature.properties.typ == "Supermarkt";
            },
			onEachFeature: pruefung,
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: einkaufMarker
                })
            }
        });	
		var mensa = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.typ == "Mensa";
            },
			onEachFeature: pruefung,
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: essenMarker
                })
            }
        });	
		var museum = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.typ == "Museum";
            },
			onEachFeature: pruefung,
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: kulturMarker
                })
            }
        });	
		var bad = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.typ == "Schwimmbad";
            },
			onEachFeature: pruefung,
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: badMarker
                })
            }
        });	
		var bauhaus = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.typ == "Bauhausbauten";
            },
			onEachFeature: pruefung,
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: bauhausMarker
                })
            }
        });		
		bank.addTo(lg_bank)
        fahrrad.addTo(lg_bike)
		post.addTo(lg_post)
        amt.addTo(lg_amt)			
        bar.addTo(lg_bar)
        cafe.addTo(lg_cafe)
		shopping.addTo(lg_shopping)
		gruenanl.addTo(lg_gruenanl)
        kino.addTo(lg_kino)
		restaur.addTo(lg_restaur)
		sight.addTo(lg_sight)
		theater.addTo(lg_theater)
		pp.addTo(lg_pp)	
		aerzte.addTo(lg_aerzte)
        apotheke.addTo(lg_Apotheke)
		krankenhaus.addTo(lg_krankenhaus)
		buha.addTo(lg_buha)
        bhf.addTo(lg_bhf)
		straba.addTo(lg_straba)
		sport.addTo(lg_sport)
		hssport.addTo(lg_hssport)
		baecker.addTo(lg_baecker)
		imbiss.addTo(lg_imbiss)					
		markt.addTo(lg_markt);
		mensa.addTo(lg_mensa);
		museum.addTo(lg_museum);
		bad.addTo(lg_bad);
		bauhaus.addTo(lg_bauhaus);
		
		searchCtrl.indexFeatures(data.features, ['name', 'str', 'typ']);	
});	

// GeoJSON für Polygone HS-Gebäude laden 	
$.getJSON("data/hsgebaeude.geojson", function(data) {
	var myStyle = {
		"fillColor": "#1874CD",
		"color": "white",
		"weight": 2,
		"fillOpacity": 0.6,
		"opacity": 0.9
	};
	function highlightFeature(e) {
		var layer = e.target;
		layer.setStyle({
			weight: 5,
			fillColor: "#FF0000",
			color: '#8B0000',
			//color: '#27408B',
			dashArray: '',
			fillOpacity: 0.7
		});
		if (!L.Browser.ie && !L.Browser.opera) {
			layer.bringToFront();
		}
	}
	function resetHighlight(e) {
		gebaeude_hochschule.resetStyle(e.target);
	}
	function onEachGeb(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight
		});
		if (feature.properties && feature.properties.popuptext) {
			layer.bindPopup(feature.properties.popuptext,popupOptions);
		}
	}		
	var gebaeude_hochschule = L.geoJson(data, {style: myStyle, onEachFeature: onEachGeb}).addTo(lg_gebaeude);
	gebaeude_hochschule.addTo(map);
});
				
$.getJSON("data/wohnheime.geojson", function(data) {
	var myStyle2 = {
		"fillColor": "#1874CD",
		"color": "white",
		"weight": 2,
		"fillOpacity": 0.6,
		"opacity": 0.9
	};
	function highlightFeature(e) {
		var layer = e.target;
		layer.setStyle({
			weight: 5,
			fillColor: "#FF0000",
			color: '#8B0000',
			dashArray: '',
			fillOpacity: 0.7
		});
		if (!L.Browser.ie && !L.Browser.opera) {
			layer.bringToFront();
		}
	}
	function resetHighlight(e) {
		wohnheime_hochschule.resetStyle(e.target);
	}
	function onEachGeb(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight
		});
		if (feature.properties && feature.properties.popuptext) {
			layer.bindPopup(feature.properties.popuptext,popupOptions);
		}
	}		
	var wohnheime_hochschule = L.geoJson(data, {style: myStyle2, onEachFeature: onEachGeb}).addTo(lg_wohnheime);
	wohnheime_hochschule.addTo(map);
});

// steuerbares LayerControl-Fenster
var baseMaps = [{ 
	groupName: "Basiskarten",
	expanded: false,
	layers: {
		"OpenStreetMap": osmLayer,
		"Google Roadmap": googleLayerRoad,
		"Google Hybrid": googleLayerHybrid,
		"Google Satellit": googleLayerSatellit,
	}
}];	
var overlays = [{
	groupName: "Hochschule",
	expanded: false,
	layers: {  
		"Hochschulgebäude": lg_gebaeude,
		"Studentenwohnheime": lg_wohnheime,
		"Mensen": lg_mensa,
		"Hochschulsport": lg_hssport,
		"Parkplätze": lg_pp,
	}},{
	groupName: "Nahverkehr",
	expanded: false,
	layers: { 
		"Hauptbahnhof": lg_bhf,
		"Bushaltestellen": lg_buha,
		"Straßenbahn": lg_straba,
	}},{
	groupName: "Gesundheit",
	expanded: false,
	layers: { 
		"Krankenhaus": lg_krankenhaus,
		"Ärzte": lg_aerzte,
		"Apotheken": lg_Apotheke,
	}},{
	groupName: "Versorgung",
	expanded: false,
	layers: { 
		"Supermärkte": lg_markt,
		"Restaurants": lg_restaur,
		"Imbiss": lg_imbiss,
		"Bäcker": lg_baecker,
	}},{
	groupName: "Freizeit",
	expanded: false,
	layers: { 
		"Shopping Center": lg_shopping,
		"Kino": lg_kino,
		"Clubs/ Bars": lg_bar,
		"Café's": lg_cafe,
		"Grünanlagen": lg_gruenanl,
		"Schwimmbäder" : lg_bad,
		"Sport": lg_sport,
	}},{
	groupName: "Kultur",
	expanded: false,
	layers: { 
		"Sehenswürdigkeiten": lg_sight,
		"Bauhaus-Architektur": lg_bauhaus,
		"Theater": lg_theater,
		"Museen": lg_museum,
	}},{	
	groupName: "Einrichtungen",
	expanded: false,
	layers: { 
		"Behörden": lg_amt,
		"Finanzen": lg_bank,
		"Post":	lg_post,
		"Fahrradläden":	lg_bike,
	}}
];	

// Layerfenster in die Karte mit gewählten Optionen einbinden	
var LayerOptions = {
				container_width 	: "220px",
				group_maxHeight     : "200px",
				//container_maxHeight : "425px", 
				exclusive       	: true
				};	

var control = L.Control.styledLayerControl(baseMaps, overlays, LayerOptions);
map.addControl(control);
	
// Plug In: ZoomHome
var zoomHome = L.Control.zoomHome();
	zoomHome.addTo(map);
	
// Plug In: LocateControl
var locationButton = L.control.locate({
	position: 'topleft',
    drawCircle: true,  // controls whether a circle is drawn that shows the uncertainty about the location
    follow: true,  // follow the user's location
    setView: false, // automatically sets the map view to the user's location, enabled if `follow` is true
    keepCurrentZoomLevel: false, // keep the current map zoom level when displaying the user's location. (if `false`, use maxZoom)
    stopFollowingOnDrag: false, // stop following when the map is dragged if `follow` is true (deprecated, see below)
    remainActive: false, // if true locate control remains active on click even if the user's location is in view.
    markerClass: L.circleMarker, // L.circleMarker or L.marker
    circleStyle: {},  // change the style of the circle around the user's location
    markerStyle: {},
    followCircleStyle: {},  // set difference for the style of the circle around the user's location while following
    followMarkerStyle: {},
    icon: 'fa fa-map-marker',  // class for icon, fa-location-arrow or fa-map-marker
    iconLoading: 'fa fa-spinner fa-spin',  // class for loading icon
    circlePadding: [0, 0], // padding around accuracy circle, value is passed to setBounds
    metric: true,  // use metric or imperial units
    onLocationError: function(err) {alert(err.message)},  // define an error callback function
    onLocationOutsideMapBounds:  function(context) { // called when outside map boundaries
            alert(context.options.strings.outsideMapBoundsMsg);
    },
    showPopup: true, // display a popup when the user click on the inner marker
    strings: {
        title: "Aktueller Standort",  // title of the locate control
        metersUnit: "Meter", // string for metric units
        feetUnit: "Fuß", // string for imperial units
        popup: "Du befindest dich in einem maximalen Umkreisradius von {distance} {unit} von diesem Punkt entfernt.",  // text to appear if user clicks on circle
        outsideMapBoundsMsg: "Du befindest dich außerhalb des Kartenausschnittes." // default message for onLocationOutsideMapBounds
    },
    locateOptions: {}  // define location options e.g enableHighAccuracy: true or maxZoom: 10
}).addTo(map);

// Plug In: MiniMap, braucht eigenen Layer
var wmsMiniMap = osmLayerGray;

// eigene Farbanpssung für das Suchfenster in der MiniMap
var rect1 = {color: "#1C86EE", weight: 2, opacity:0.9, fillOpacity:0.4};
var rect2 = {color: "#1E90FF", weight: 1, opacity:0.7, fillOpacity:0.1};		
var miniMap = new L.Control.MiniMap(wmsMiniMap, {
	position: 'bottomright',
	width: 200,
	height: 200,
	//collapsedWidth: 40,	// Größe des ToggleMarkers
	//collapsedHeight: 40,
	zoomLevelOffset: -5,
	//zoomLevelFixed: 12,
	zoomAnimation: true,
	toggleDisplay: true,
	autoToggleDisplay: false,
	aimingRectOptions: rect1,
	shadowRectOptions: rect2
}).addTo(map);
miniMap._minimize();	//schließt MiniMap zu Beginn der Anwendung