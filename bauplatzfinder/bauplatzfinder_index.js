
function availablePlace(polygon){
	this.score= 0;
	this.location= turf.center(polygon);
	//console.log(polygon);
	this.polygon= turf.polygon(polygon);
	//console.log(this.polygon);
};

function getFactorFromLayer(layer){	
var value;
	switch (layer.get('title')) {
		
	case 'Bodenrichtwertzonen':
		value = $('#kosten').val();
		break;
	case 'Gesundheitseinrichtungen':
		value = $('#gesundheit').val();
		break;
	case 'Gruenflaechen':
		value = $('#parks').val();
		break;
	case 'Haltestellen':
		value = $('#haltestellen').val();
		break;
	case 'Kindertagesstaetten':
		value = $('#kindergarten').val();
		break;
	case 'Schulen':
		value = $('#schulen').val();
		break;
	case 'Spielplaetze':
		value = $('#spielplatz').val();
		break;
	case 'Supermaerkte':
		value = $('#lebensmittel').val();
		break;
	}
	return value * 10;
}

function getValue(available, valueLayer) {
	
	for(f of valueLayer.getSource().getFeatures()) {
			
			var c = f.getGeometry().getCoordinates();
			
			
			for(co of c) {
				var polygonPoints = new Array();
				for(cx of co) {
					polygonPoints.push(turf.point([parseFloat(cx[0]), parseFloat(cx[1])]));
				}
			var polygon = turf.polygon([polygonPoints]);
			var within = turf.pointsWithinPolygon([available.location], polygon);
				if(within) {
					return f.get('wert');
				}
			}
	}
}

function getClosestDistance(available, featureLayer) {
		let features = featureLayer.getSource().getFeatures();
		
		var polygonPoints = new Array();
		for(c of features) {
			var co = c.getGeometry().getCoordinates();
			if (typeof co[0] !== 'undefined' || typeof co[1] !== 'undefined') {
				var point = turf.point([parseFloat(co[0]), parseFloat(co[1])]);
				polygonPoints.push(point);
			}	
		}
		var collection = turf.featureCollection(polygonPoints);
		
		let closest = turf.nearestPoint(available.location, collection);
		
		return closest.properties.distanceToPoint;
	}


function calculateAreaFactor(available, featureLayer) {
	var mindist =-1;
	for(f of featureLayer.getSource().getFeatures()) {
			
			var c = f.getGeometry().getCoordinates();
			var polygonPoints = new Array();
			
			
			for(co of c[0][0]) {
				polygonPoints.push(turf.point([parseFloat(co[0]), parseFloat(co[1])]));
			}
				
				//var line = turf.lineString([polygonPoints]);
				
				//console.log(line);
				//var dist = turf.pointToLineDistance(available.location, line);
				
				//console.log(dist);
			
	}		
};

// Sources
var source_bpl = new ol.source.Vector();
var source_brwz = new ol.source.Vector();
var source_kts = new ol.source.Vector();
var source_bp = new ol.source.Vector();
var source_ge = new ol.source.Vector();
var source_gf = new ol.source.Vector();
var source_hs = new ol.source.Vector();
var source_schule = new ol.source.Vector();
var source_sp = new ol.source.Vector();
var source_sm = new ol.source.Vector();

//Layer
var bpl;
var brwz;
var kts;
var bp;
var ge;
var gf;
var hs;
var schulen;
var sp;
var sm;

var map;
var highlightLayer;

// Zoom auf Dresden
var view_dd = new ol.View({
	center: ol.proj.fromLonLat([ 13.74, 51.05 ]),
	maxZoom: 20,
	minZoom: 3,
	zoom: 13		
});



function start(){
	$.ajax('./bauplatzfinder_data/bebauungsplaene.geojson').then(function(response) {
	  var geojsonFormat = new ol.format.GeoJSON();
	  var features = geojsonFormat.readFeatures(response,
		  {featureProjection: 'EPSG:3857'});

	  source_bpl.addFeatures(features);
	});
	
	$.ajax('./bauplatzfinder_data/bodenrichtwertzonen.geojson').then(function(response) {
	  var geojsonFormat = new ol.format.GeoJSON();
	  var features = geojsonFormat.readFeatures(response,
		  {featureProjection: 'EPSG:3857'});

	  source_brwz.addFeatures(features);
	});
	
	$.ajax('./bauplatzfinder_data/Kindertagesstaetten.geojson').then(function(response) {
	  var geojsonFormat = new ol.format.GeoJSON();
	  var features = geojsonFormat.readFeatures(response,
		  {featureProjection: 'EPSG:3857'});

	  source_kts.addFeatures(features);
	});
	
	$.ajax('./bauplatzfinder_data/Bauplaetze.geojson').then(function(response) {
	  var geojsonFormat = new ol.format.GeoJSON();
	  var features = geojsonFormat.readFeatures(response,
		  {featureProjection: 'EPSG:3857'});

	  source_bp.addFeatures(features);
	});
	
	$.ajax('./bauplatzfinder_data/Gesundheitseinrichtungen.geojson').then(function(response) {
	  var geojsonFormat = new ol.format.GeoJSON();
	  var features = geojsonFormat.readFeatures(response,
		  {featureProjection: 'EPSG:3857'});

	  source_ge.addFeatures(features);
	});
	
	$.ajax('./bauplatzfinder_data/Gruenflaechen.geojson').then(function(response) {
	  var geojsonFormat = new ol.format.GeoJSON();
	  var features = geojsonFormat.readFeatures(response,
		  {featureProjection: 'EPSG:3857'});

	  source_gf.addFeatures(features);
	});
	
	$.ajax('./bauplatzfinder_data/Schulen.geojson').then(function(response) {
	  var geojsonFormat = new ol.format.GeoJSON();
	  var features = geojsonFormat.readFeatures(response,
		  {featureProjection: 'EPSG:3857'});

	  source_schule.addFeatures(features);
	});
	
	$.ajax('./bauplatzfinder_data/Spielplaetze.geojson').then(function(response) {
	  var geojsonFormat = new ol.format.GeoJSON();
	  var features = geojsonFormat.readFeatures(response,
		  {featureProjection: 'EPSG:3857'});

	  source_sp.addFeatures(features);
	});
	
	$.ajax('./bauplatzfinder_data/Supermaerkte.geojson').then(function(response) {
	  var geojsonFormat = new ol.format.GeoJSON();
	  var features = geojsonFormat.readFeatures(response,
		  {featureProjection: 'EPSG:3857'});

	  source_sm.addFeatures(features);
	});
	
	/*$.ajax('./bauplatzfinder_data/Haltestellen.geojson').then(function(response) {
	  var geojsonFormat = new ol.format.GeoJSON();
	  var features = geojsonFormat.readFeatures(response,
		  {featureProjection: 'EPSG:3857'});

	  source_hs.addFeatures(features);
	});
	*/

 bpl = new ol.layer.Vector({
	title: 'Bebauungsplaene',
	source: source_bpl,
	style: new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: 'rgb(225, 8, 32)',
			width: 3
		})
	})
});

 brwz = new ol.layer.Vector({
	title: 'Bodenrichtwertzonen',
	source: source_brwz
});

 bp = new ol.layer.Vector({
	title: 'Bauplaetze',
	source: source_bp,
	style: new ol.style.Style({
		fill: new ol.style.Fill({
			color: 'rgba(0, 0, 0, 0)'
		}),
		stroke: new ol.style.Stroke({
			color: 'rgba(0, 123, 255, 1)',
			lineDash: [10, 10],
			width: 5
		})
	})
});

 ge = new ol.layer.Vector({
	title: 'Gesundheitseinrichtungen',
	source: source_ge
});

 gf = new ol.layer.Vector({
	title: 'Gruenflaechen',
	source: source_gf
});

 kts = new ol.layer.Vector({
	title: 'Kindertagesstaetten',
	source: source_kts
});

 schulen = new ol.layer.Vector({
	title: 'Schulen',
	source: source_schule
});

 sp = new ol.layer.Vector({
	title: 'Spielplaetze',
	source: source_sp
});

 sm = new ol.layer.Vector({
	title: 'Supermaerkte',
	source: source_sm
});

 /*hs = new ol.layer.Vector({
	title: 'Haltestellen',
	source: source_hs
});*/


// Basiskarte: TopPlusOpen des BKG
var topPlusOpen = new ol.layer.Tile({
	title: 'Topografische Karte',
	layerSwitcherFormat: 'base',
	noSwitcherDelete: true,
	visible: true,
	opacity: 0.7, // etwas heller
	source: new ol.source.XYZ({
		attributions: [new ol.Attribution({
			html: ' © <a target="_blank" href="http://www.bkg.bund.de">BKG '+ new Date().getFullYear()+'</a>, <a target="_blank" href="http://sg.geodatenzentrum.de/web_public/Datenquellen_TopPlus_Open.pdf">Datenquellen</a>'
		})],
		crossOrigin: 'anonymous',
		url: 'https://sgx.geodatenzentrum.de/wmts_topplus_web_open/tile/1.0.0/web_grau/default/WEBMERCATOR/{z}/{y}/{x}.png'
	}),
	minResolution: 2
});

// ALKIS Sachsen
var alkis_sn = new ol.layer.Tile({
	title: 'Sachsen',
	layerSwitcherFormat: 'alkis',
	noSwitcherDelete: false,
	source: new ol.source.TileWMS({
		url: 'https://maps.kommunalberatung.de/sachsen/wms_geosn_alkis-adv/guest?',
		attributions: [new ol.Attribution({
			html: ' © <a target="_blank" href="https://geoportal.sachsen.de">GeoSN</a> <a target="_blank" href="https://www.govdata.de/dl-de/by-2-0">dl-de-by-2.0</a>'
		})],
		params: {
			LAYERS: ['adv_alkis_gebaeude', 'adv_alkis_weiteres','adv_alkis_flurstuecke'], 
			FORMAT: 'image/png',
			TILED: true
		}
	}),
	maxResolution: 3
});


// DOP Sachsen
var dop_sn = new ol.layer.Tile({
	title: 'Sachsen',
	layerSwitcherFormat: 'dop',
	noSwitcherDelete: false,
	source: new ol.source.TileWMS({
		url: 'https://maps.kommunalberatung.de/sachsen/wms_geosn_dop-rgb/guest?',
		attributions: [new ol.Attribution({
			html: ' © <a target="_blank" href="https://geoportal.sachsen.de">GeoSN</a> <a target="_blank" href="https://www.govdata.de/dl-de/by-2-0">dl-de-by-2.0</a>'
		})],
		params: {
			LAYERS: ['sn_dop_020'],
			FORMAT: 'image/png', 
			TILED: true
		}
	}),
	maxResolution: 3
});



// Overlay: Highlight-Layer für Ergebnisauswahl
highlightLayer = new ol.layer.Vector({
	source: new ol.source.Vector({
		format: new ol.format.GeoJSON()
	}),
	zIndex: 10000, // Layer immer im Vordergrund
	style: new ol.style.Style({
		fill: new ol.style.Fill({
			color: 'rgba(0, 255, 0, 0.5)'
		}),
		stroke: new ol.style.Stroke({
			color: 'rgba(0, 255, 0, 1)'
		})
	})
});

map = new ol.Map({
	//layers: [topPlusOpen, bpl, brwz, bp, ge, gf, kts, schulen, sp, sm, hs],
	layers: [dop_sn, topPlusOpen, alkis_sn, highlightLayer],
	target: document.getElementById('map'),
	view: view_dd
});

}

function test() {
	var areaLayerArray = [brwz, gf];
	var distanceLayers = [ge, kts, schulen, sp, sm];
	var availablePlaces = new Array();

	
	function compare(a,b) {
		return b.score-a.score;
	}

for(polygon of source_bp.getFeatures()) {
	var polygonPoints = new Array();
	for(c of polygon.getGeometry().getCoordinates()[0]) {
		polygonPoints.push(turf.point([parseFloat(c[0]), parseFloat(c[1])]));
		}
	var collection = turf.featureCollection(polygonPoints);
	//console.log(collection);
	availablePlaces.push(new availablePlace(collection));
};

for(av of availablePlaces) {
	for(fLayer of distanceLayers) {
		av.score += getFactorFromLayer(fLayer)*1/getClosestDistance(av, fLayer);
	}
	av.score += getFactorFromLayer(brwz)*2000/getValue(av, brwz);
	//av.score += getFactorFromLayer(gf)*1/calculateAreaFactor(av, gf);
	}
	
	resultArray = new Array();
	
	for(av of availablePlaces) {
		resultArray.push(av);
	}
	
	resultArray.sort(compare);
	
	var x = resultArray.slice(0,10);
	console.log(x);
		
	var items=[];
	x.forEach(function(index, Element) {
		//console.log(index);
		//console.log(Element);
		items.push($('<li/>').addClass('list-group-item')
			.css('cursor', 'pointer')
			.text("Platz "+Element)
			.data('feat', index));
	});
	$('#bp_ranking').append(items);

	$('#card').removeClass('invisible');
	
	
	$('.list-group-item').on('click', function(){
		var this_ = $(this);
		var feature = this_.data('feat');
		console.log(feature.score);
		//console.log(feature.location);
		//console.log(feature.polygon);
		
		var coord = feature.location.geometry.coordinates;
		map.getView().setCenter(coord);
		map.getView().setZoom(18);
		
		//var poly = feature.polygon.geometry;
		//console.log(poly);
		
		//var extent = bp.getSource().getExtent();
		//map.getView().fit(extent,map.getSize());
		
		
		
		var poly = bp.getSource().getFeatures();
		
		
		for(var i=0; i<poly.length; i++){
			var p = poly[i];
			console.log(p);

			var geometry = poly[i].getGeometry();
			//console.log(geometry);
			var coo = geometry.getCoordinates();
			console.log(coo);
			//console.log(coo.toString());
			//var type = geometry.getType();
			
			//console.log(poly[i].getProperties().sst_lv_3_liste);
			
			/*console.log(coord);
			var pt = turf.points([coord]);
			console.log(pt);
			var poly = turf.polygon(coo);
			console.log(poly);
			
			if( turf.pointsWithinPolygon(pt, poly) ){
				console.log('gefunden');
				
				
				console.log(p);
				
				/*var parserJSON = new ol.format.GeoJSON();
				var f = parserJSON.readFeatures(p);
				console.log(f);*//*
				
				var src = highlightLayer.getSource()
				//src.addFeature(p);
				src.addFeature(new ol.Feature(new ol.geom.Polygon(coo)));

				console.log(highlightLayer.getSource());
				
				map.getLayers().push(bp);
			
				break;
			} */
			map.getLayers().push(bp);
			
		}
	});
}
