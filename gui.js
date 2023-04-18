$(document).ready(function() {
	$('#welcome').modal('show');
	$('[data-toggle="tooltip"]').tooltip();
});

$('#btn_start').on('click', function(){
	test();
});


$('#btn_tryAgain').on('click', function(){

	$('#card').addClass('invisible');
	
	$('#bp_ranking').empty();
	
	
	// Zoom auf Dresden
	var view_dd = new ol.View({
		center: ol.proj.fromLonLat([ 13.74, 51.05 ]),
		maxZoom: 20,
		minZoom: 3,
		zoom: 13		
	});
	map.setView(view_dd);
	map.removeLayer(bp);
	
	//highlightLayer.getSource().clear();// gehighlighted Objekt in Karte zurücksetzen

	
	$('#welcome').modal('show');

});

/*$('.custom-range').on('change', function(){
	var this_ = $(this).val();
	console.log(this_);
});*/


