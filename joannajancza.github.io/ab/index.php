<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css" />
	<script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"></script>
	
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
  		   integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
  		   crossorigin=""/>
	<script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"
  	integrity="sha512-QVftwZFqvtRNi0ZyCtsznlKSWOStnDORoefr1enyq5mVL4tmKB3S/EnC3rRJcxCPavG10IcrVGSmPh6Qw5lwrg=="
 	 crossorigin=""></script>
	
	
	<title>Document</title>
</head>
<body>

	<form action="query_insert.php" method="post" id="startForm">
		<h1>Formularz do wprowadzania danych do bazy danych</h1>
		<br/>Dane opisowe<br/>
		<input type="text" value="punkt" name="formularz_zmienna_1"/>
		<br/>Dane liczbowe<br/>
		<input type="text" name="formularz_zmienna_2" value="154"/>
		<br/>Szerokość geograficzna<br/>
		<input type="text" name="zmienna_formularz_SZER" value='21.2'>
		<br/> Długość geograficzna<br/>
		<input type="text" name="zmienna_formularz_DL" value='21.2'><br/><br/>
		<input type="submit" value="wyślij formularz" id="wyslijSF">
	</form>
<br/>
	<input type="button" value="zobacz dane" id="guzik"/>
	<div id='response'></div>

<script type="text/javascript" src="./lib/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="./lib/leaflet.ajax.min.js"></script>
<script type="text/javascript" src="query_select.js"></script>


</body>
</html>