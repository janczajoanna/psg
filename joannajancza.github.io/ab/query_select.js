$(document).ready(function(){	
	//tutaj jest kawałek kodu w którym przypisane są zmienne z adresami do udostępnianych usługą wms danych
	var daneOSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
	
	var daneORTO = L.tileLayer.wms("http://mapy.geoportal.gov.pl/wss/service/img/guest/ORTO/MapServer/WMSServer", {layer: "Raster", format:"image/png", transparent:'true', version: '1.1.1'});
	
	var danePanstwo = L.tileLayer.wms("http://localhost:8090/geoserver/projekt_KOM/wms", {
		layers: "projekt_KOM:panstwo",
		format: 'image/png',
		transparent: true,
    	version: '1.1.1'
	});
	
	var daneMAPA = L.tileLayer.wms("http://localhost:8090/geoserver/projekt_KOM/wms", {
		layers: "projekt_KOM:geotiff_coverage",
		format: 'image/png',
		transparent: true,
    	version: '1.1.1'
	});
	
	//zmienna przechowujaca stylizacje danych pobieranych z pliku GeoJSON
	var styl_wojewodztwa = {
		"color":"green"
	};
	
	//zmienna przechowująca obiekt biblioteki leaflet, wywołujący na rzecz obiektu metode GeoJSON.AJAX jako atrybuty dla metody podaję adres danych i nazwe zmiennej do stylizacji
	//var wojewodztwa_qgis = new L.GeoJSON.AJAX("qgis_wojewodztwa.geojson",{style:styl_wojewodztwa});
	
	//wywolanie metody addTo na rzecz obiektu Wojewodztwa i dodanie danych do okna mojaMapa
	//wojewodztwa_qgis.addTo(mojaMapa);
	
	//tutaj jest przypisanie do zmiennej obiektu "L" i wywołanie metody .map która tworzy mapę o wybranych parametrach
	var mojaMapa = L.map('mapid',{center:[52.23, 21.0], zoom: 15});
	
	//wywołanie mapy i wprowadznie do niej danych z OSM
	mojaMapa.addLayer(daneOSM);
		
	//obsługa obrazka rastrowego z dysku lub strony www
	//var imageUrlUstka = 'ustka.png',
    //imageBoundsUstka = [[54.595833, 16.86167], [54.579167, 16.845]];
	//L.imageOverlay(imageUrlUstka, imageBoundsUstka).addTo(mojaMapa);
	
	
	//obsługę różnych źródeł danych
	var baseMaps = {
		"OpenStreetMaps": daneOSM,
		"Ortofotomapa": daneORTO,
		"MapaTopograficzna": daneMAPA,		
	};
	var overlays = {
		"GranicaPanstwa": danePanstwo,
	
	};
		
	//dodanie guzika do przełączania danych między różnymi źródłami.
	L.control.layers(baseMaps, overlays).addTo(mojaMapa);
	
	//dodanie skali
	L.control.scale({imperial: false}).addTo(mojaMapa);
	
	
	//dodanie lokalizacji i obsługa lokalizacji
	
	mojaMapa.locate({setView: true, maxZoom: 14});
	
	
	//funkcja która wyświetla ikonę okręgu w miejscu gdzie się znajdujemy (współrzędne są przesyłane za pomocą zmiennej o nazwie event)
	
	function zlokalizowano(event){
		var radius = event.accuracy/2;
		//L.marker(event.latlng).addTo(mojaMapa);
		L.circle(event.latlng, radius).addTo(mojaMapa);
	};
	
	mojaMapa.on('locationfound', zlokalizowano);
	
	
//dodaje obrazek
//	var imageUstka = 'ustka.png',
 //   imageBounds = [[54.5958333, 16.8616667], [54.5791667, 16.84500]];
//	L.imageOverlay(imageUstka, imageBounds).addTo(mojaMapa);

//dodaje markera
	mojaMapa.on('click', function(e){
		var zmienna_formularz_SZER = e.latlng.lat;
		var zmienna_formularz_DL = e.latlng.lng;
		var formularz_zmienna_1='';
		var formularz_zmienna_2='';
		
		L.marker(e.latlng).bindPopup('<form action="query_insert.php" method="post" id="myForm"><h1>Formularz do wprowadzania danych do bazy danych</h1><br/>Dane opisowe<br/><input type="text" value="punkt" name="formularz_zmienna_1"/><br/>Dane liczbowe<br/><input type="text" name="formularz_zmienna_2" value="123"/><br/>Szerokość geograficzna<br/><input type="text" name="zmienna_formularz_SZER" value='+zmienna_formularz_SZER+'><br/> Długość geograficzna<br/><input type="text" name="zmienna_formularz_DL" value='+zmienna_formularz_DL+'><br/><br/><input type="button" value="wyślij formularz" id="wyslij"></form>').addTo(mojaMapa);
		


	});
	
		$("#myForm").submit(function(ev){
			ev.preventDefault();
			var form = $(this).serialize();
			
				// Make AJAX request
			$.post("query_insert.php", form).complete(function() {
				console.log("Success");
			});
		});		
	
		$("#wyslijSF").on('click', function(){
			console.log('dziala')
			
		});	
	
	
	
//funkcja do wyświetlania popup's
function onEachFeature(feature, layer) {
    layer.bindPopup("<h2>Dane o obiekcie</h2>"
					+"Dane o obiekcie"+"<br/>"
					+"Dane opisowe: "+feature.properties.dane_tekstowe+"<br/>"
					+"Dane liczbowe: "+feature.properties.dane_numeryczne+"<br/>"
					+"Współrzędne"+";<br/>"
					+"Długość geograficzna:   "+feature.geometry.coordinates[0].toFixed(3)+" E<br/>"
					+"Szerokość geograficzna: "+feature.geometry.coordinates[1].toFixed(3)+" N<br/>"
					+"<br/><input type='Button' value='modyfikuj' />");
    };

	
	
  $.ajax(
	{
	url:'query_load.php',
	success: function(response){
		//console.log(JSON.parse(response));
		a=JSON.parse(response);
		lyrTest = L.geoJSON(a, {onEachFeature:onEachFeature}).addTo(mojaMapa);
	},
	error: function(xhr, status, error){
		console.log("error"+error);
	}}
  );
});