	<?php
	
require_once ('database.php');
	
//tekst do nawiązania polaczenia 
	$conn_string ="host=".$db_host." port=".$db_port." dbname=".$db_name." user=".$db_user." password=".$db_pass;
//zmienna do ktorej przypisana zostaje funkcja polaczenie z tekstem... 
    $polaczenie = pg_connect ("$conn_string") ;

/*
    jeżeli nie działa na nowej instalacji systemu tzn ze trzeba w xampp w plicu config php.ini odznaczyć komentarze przy bibliotekach pgsql
*/

    // sprawdzam status połączenia uwaga ! skrypt nie zabezpieczony przed sql injection.

    $stat = pg_connection_status($polaczenie);
   // if ($stat === PGSQL_CONNECTION_OK) echo "poprawnie nawiazano polaczenie \n " ;
    //do tego miejsca ok
	