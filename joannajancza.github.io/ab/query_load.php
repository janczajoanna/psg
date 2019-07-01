<?php
require_once('connect.php');
//ten skrypt ma za zadanie pobrać dane z Bazy danych i sformatować je tak żeby wyszedł nam poprawny GEOJSON, który można użyć w leaflet
$result = pg_query("SELECT identyfikator, dane_tekstowe, dane_numeryczne, ST_AsGeoJSON (dane_geograficzne, 5) as geometria FROM public.tabela_przykladowa ORDER BY identyfikator ASC ");
$tablica= pg_fetch_all($result);
$tablica_strukturaGeoJSON =[];
foreach($tablica AS $wiersz){
	$wiersz['geometria']=json_decode($wiersz['geometria']);
	$wiersz_GeoJSON = ["type"=>"Feature", "geometry"=>$wiersz['geometria'],"properties"=>$wiersz]; 
array_push($tablica_strukturaGeoJSON, $wiersz_GeoJSON);
};
$tablica_kolekcja_obiektow = ["type"=>"FeatureCollection", "features"=>$tablica_strukturaGeoJSON];
echo json_encode($tablica_kolekcja_obiektow);
pg_close($polaczenie);
?>



