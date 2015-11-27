<?php

function getCurrentPeriod () {
	$file = fopen("ptec.txt", "r");
	$content = fread($file, filesize("ptec.txt"));
	
	echo preg_replace("/\.*/", "", $content);
}

function getTarifs ($date) {
	$mysqli = new mysqli("localhost", "edfdata", "edfdata", "EDFDATA");
	if ($mysqli->connect_errno) {
		echo "Echec lors de la connexion à MySQL : (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}
	
	if ($date == "today") {
		$dt = new DateTime();
		$date = $dt->format('Y-m-d'); // Beurk! mais rapide...
	}
	
	$row = getRawTarifs($date, $mysqli);
	
	return json_encode($row);
}

function getRawTarifs ($date, $cnx) {
	$request = "select date, abonnement, hc as HC, hp as HP from tarifs where date <= '".$date." 23:59' order by date desc limit 1";
	$results = $cnx->query($request);
	
	return $row = $results->fetch_assoc();
}

function getDatasConsoTotal ($nbDays) {
	$mysqli = new mysqli("localhost", "edfdata", "edfdata", "EDFDATA");
	if ($mysqli->connect_errno) {
	    echo "Echec lors de la connexion à MySQL : (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}

	$request="select date, CONCAT( YEAR(date), MONTH(date),DAYOFMONTH(date)) as YMD,YEAR(date) as Y, LPAD(MONTH(date),2,0) as M, DAYOFMONTH(date) as D, HOUR(date) as H, MINUTE(date) as MIN, SECOND(date) as SEC, MAX(hchc) as hchc, hchp from conso where date > DATE_SUB(NOW(), INTERVAL ".$nbDays." day) group by YMD ORDER BY date";
	$results = $mysqli->query($request);


	$datas = '{"cols": [{"id":"","label":"Date","type":"string","pattern":""},{"id":"","label":"Heures pleines","type":"number","pattern":""},{"id":"","label":"Heures creuses","type":"number","pattern":""}],"rows": [';

	$count = 0;
    while($row = $results->fetch_assoc()){
	  $month = $row["M"];
      $day    = $row['D']."/".$month."/".$row['Y'];

		if ($count != 0 ) {
			$datas .= ",";
		}
		$count ++;
		$datas .= '{"c":[{"v":"'.$day.'","f":"'.$day.'"},{"v":"'.($row['hchp']/1000).'","f":"'.($row['hchp']/1000).' Wh"},{"v":"'.($row['hchc']/1000).'","f":"'.($row['hchc']/1000).' Wh"}]}';


    }

	$datas .= "]}";

	return $datas;
}

function getDatasDeltaConso($nbDays) {
	$mysqli = new mysqli("localhost", "edfdata", "edfdata", "EDFDATA");
	if ($mysqli->connect_errno) {
	    echo "Echec lors de la connexion à MySQL : (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}

	$request = "select DATE_FORMAT(date, '%d/%m/%Y') as dateYMD, max(hchc) as hchc, max(hchp) as hchp  from conso  where  date > DATE_SUB(NOW(), INTERVAL ".$nbDays." day) group by dateYMD  ORDER BY date";
	$results = $mysqli->query($request);


	$datas = '{"cols": [{"id":"","label":"Date","type":"string","pattern":""},{"id":"","label":"Heures pleines","type":"number","pattern":""},{"id":"","label":"Heures creuses","type":"number","pattern":""}],"rows": [';

	$count = 0;
	$previousValHc=0;
	$previousValHp=0;
    while($row = $results->fetch_assoc()){
      $day    = $row['dateYMD'];

		if ($count > 1 ) {
			$datas .= ",";
		}
		if ($count >=1) {
			$curHc = ($row['hchc'] - $previousValHc) / 1000;
			$curHp = ($row['hchp'] - $previousValHp) / 1000;
			$datas .= '{"c":[{"v":"'.$day.'","f":"'.$day.'"},{"v":"'.$curHp.'","f":"'.$curHp.' kWh"},{"v":"'.$curHc.'","f":"'.$curHc.' kWh"}]}';
		}

		$previousValHc = $row['hchc'];
		$previousValHp = $row['hchp'];

		$count ++;
    }

	$datas .= "]}";

	return $datas;
}

function getDatasDeltaConsoPrix($nbDays) {
	$mysqli = new mysqli("localhost", "edfdata", "edfdata", "EDFDATA");
	if ($mysqli->connect_errno) {
		echo "Echec lors de la connexion à MySQL : (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}

	$request = "select DATE_FORMAT(date, '%d/%m/%Y') as dateYMD, DATE_FORMAT(date, '%Y-%m-%d') as dateDMY, max(hchc) as hchc, max(hchp) as hchp  from conso  where  date > DATE_SUB(NOW(), INTERVAL ".$nbDays." day) group by dateYMD  ORDER BY date";
	$results = $mysqli->query($request);


	$datas = '{"cols": [{"id":"","label":"Date","type":"string","pattern":""},{"id":"","label":"Heures pleines","type":"number","pattern":""},{"id":"","label":"Heures creuses","type":"number","pattern":""}],"rows": [';

	$count = 0;
	$previousValHc=0;
	$previousValHp=0;
	while($row = $results->fetch_assoc()){
		$day    = $row['dateYMD'];
		
		$tarifs = getRawTarifs($row['dateDMY'], $mysqli);
		
		if ($count > 1 ) {
			$datas .= ",";
		}
		if ($count >=1) {
			$curHc = round(($row['hchc'] - $previousValHc) / 1000 * $tarifs["HC"], 2);
			$curHp = round(($row['hchp'] - $previousValHp) / 1000 * $tarifs["HP"], 2);
			$datas .= '{"c":[{"v":"'.$day.'","f":"'.$day.'"},{"v":"'.$curHp.'","f":"'.$curHp.' €"},{"v":"'.$curHc.'","f":"'.$curHc.' €"}]}';
		}

		$previousValHc = $row['hchc'];
		$previousValHp = $row['hchp'];

		$count ++;
	}

	$datas .= "]}";

	return $datas;
}

function getDatasDeltaConsoPrixMois($nbYears) {
	$mysqli = new mysqli("localhost", "edfdata", "edfdata", "EDFDATA");
	if ($mysqli->connect_errno) {
		echo "Echec lors de la connexion à MySQL : (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}

	$mois = ["Jan", "Fev", "Mar", "Avr", "Mai", "Juin", "Juil", "Aou", "Sep", "Oct", "Nov", "Dec"];
	
	$request = "select DATE_FORMAT(date, '%m') as Month, DATE_FORMAT(date, '%d/%m/%Y') as dateYMD, DATE_FORMAT(date, '%Y-%m-%d') as dateDMY, max(hchc) as hchc, max(hchp) as hchp  from conso  where  date > DATE_SUB(NOW(), INTERVAL ".$nbYears." year) group by Month ORDER BY date desc";
	$results = $mysqli->query($request);


	$datas = '{"cols": [{"id":"","label":"Mois","type":"string","pattern":""},{"id":"","label":"Montant","type":"number","pattern":""}],"rows": [';

	$count = 0;
	$previousValHc=0;
	$previousValHp=0;
	$values = [0,0,0,0,0,0,0,0,0,0,0,0];
	while($row = $results->fetch_assoc()){
		$tarifs = getRawTarifs($row['dateDMY'], $mysqli);
		
		if ($count >=1) {
			$values[intval($row["Month"])] += ($row['hchc'] - $previousValHc) / 1000 * $tarifs["HC"] + ($row['hchp'] - $previousValHp) / 1000 * $tarifs["HP"];
		}
		$previousValHc = $row['hchc'];
		$previousValHp = $row['hchp'];

		$count ++;
	}

	
	
	$count = 0;
	foreach ($values as $hc) {
		if ($count > 0 ) {
			$datas .= ",";
		}
		
		$request = "select abonnement/12 as euros from tarifs where MONTH(date) <= ".($count+1)." order by date desc limit 1";
		$aboMois = $mysqli->query($request)->fetch_assoc()["euros"];
		$cur = round($hc+$aboMois, 2);
	
		$datas .= '{"c":[{"v":"'.$mois[$count].'","f":"'.$mois[$count].'"},{"v":"'.$cur.'","f":"'.$cur.' €"}]}';
		$count ++;
	}
	
	$datas .= "]}";

	return $datas;
}

function getDatasPuissanceDays($nbDays) {
	$request = 'SELECT date as timestamp, YEAR(date) as Y, MONTH(date) as M, DAYOFMONTH(date) as D, HOUR(date) as H, MINUTE(date) as MIN, SECOND(date) as SEC, amps as A, watts as W, va from puissance where date > DATE_SUB(NOW(), INTERVAL '.$nbDays.' day)';

	return getDatasPuissance($request);
}

function getDatasPuissanceRange ($startDate, $endDate) {
	$request = 'SELECT date as timestamp, YEAR(date) as Y, MONTH(date) as M, DAYOFMONTH(date) as D, HOUR(date) as H, MINUTE(date) as MIN, SECOND(date) as SEC, amps as A, watts as W, va from puissance where (date BETWEEN STR_TO_DATE("'.$startDate.'", "%d-%m-%Y %H:%i") AND STR_TO_DATE("'.$endDate.'", "%d-%m-%Y %H:%i"))';

	return getDatasPuissance($request);
}

function getDatasPuissance($sqlRequest) {
	$mysqli = new mysqli("localhost", "edfdata", "edfdata", "EDFDATA");
	if ($mysqli->connect_errno) {
	    echo "Echec lors de la connexion à MySQL : (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}

	$results = $mysqli->query($sqlRequest)  or die($mysqli->error.__LINE__);


	$datas = '{"cols": [{"id":"","label":"Date","type":"date","pattern":""},{"id":"","label":"Amperes","type":"number","pattern":""},{"id":"","label":"V.A","type":"number","pattern":""},{"id":"","label":"Watts","type":"number","pattern":""}],"rows": [';

	$count = 0;
	while($row = $results->fetch_assoc()){
		$year   = $row['Y'];
		$month  = $row['M']-1;
		$day    = $row['D'];
		$hour   = $row['H'];
		$minute = $row['MIN'];
		$second = $row['SEC'];

		if ($count != 0 ) {
			$datas .= ",";
		}
		$count ++;
		$datas .= '{"c":[{"v":"Date('.$year.", ".$month.", ".$day.", ".$hour.", ".$minute.", ".$second.')","f":"'.$row["timestamp"].'"},{"v":"'.$row['A'].'","f":"'.$row['A'].' A"},{"v":"'.$row['va'].'","f":"'.$row['va'].' V.A"},{"v":"'.$row['W'].'","f":"'.$row['W'].' W"}]}';

	}

	$datas .= "]}";


	return $datas;
}
?>
