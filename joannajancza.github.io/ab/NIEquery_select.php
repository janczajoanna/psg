<?php
require_once('connect.php');


$result=pg_query("SELECT identyfikator, dane_tekstowe, dane_numeryczne, ST_AsGeoJSON(geometria) as geometria FROM public.tabela_przykladowa ORDER BY identyfikator ASC ");
if ($result){
	
	$tablica =pg_fetch_all($result);
	
	$features=[];//tablica do której wysyłane są wszystkie poprawnie sformatowane w geojson dane 
	foreach($tablica as $tablica_wiersz){
	//print_r ($array_line);
	//echo ("{$tablica_wiersz['zmienna_1']} {$tablica_wiersz['zmienna_2']} {$tablica_wiersz['geometria']}");
	$geometria= $tablica_wiersz['geometria']=json_decode($tablica_wiersz['geometria']);
	unset($tablica_wiersz['geometria']);
		$feature=["type"=>"Feature","geometry"=>$geometria, "properties"=>$tablica_wiersz];
		echo json_encode($feature)."<br/><br/>";
		array_push($features, $feature);
	};
}else{
	echo 'nie działa';
};

	$featureCollection=["type"=>"FeatureCollection","Features"=>$features];
	echo json_encode($featureCollection);

	
	
pg_close($polaczenie);

?>