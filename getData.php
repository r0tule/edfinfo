<?php 
require_once("functions.php");

if (isset($_GET["conso"]) && $_GET["conso"] == "conso") {
	echo getDatasConsoTotal ($_GET["days"]); 
}
if (isset($_GET["conso"]) && $_GET["conso"] == "consoDelta") {
	echo getDatasDeltaConso ($_GET["days"]); 
}
if (isset($_GET["conso"]) && $_GET["conso"] == "consoDeltaPrix") {
	echo getDatasDeltaConsoPrix($_GET["days"]); 
}
if (isset($_GET["conso"]) && $_GET["conso"] == "consoDeltaPrixMois") {
	echo getDatasDeltaConsoPrixMois($_GET["days"]); 
}

if (isset($_GET["puissance"]) && $_GET["puissance"] == "days") {
	echo getDatasPuissanceDays ($_GET["days"]); 
}

if (isset($_GET["puissance"]) && $_GET["puissance"] == "range") {
	echo getDatasPuissanceRange ($_GET["startDate"], $_GET['endDate']); 
}

if (isset($_GET["period"])) {
	echo getCurrentPeriod();
}

if (isset($_GET["tarifs"])) {
	echo getTarifs($_GET["date"]);
}
 ?>
