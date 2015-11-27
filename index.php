<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
		<script type="text/javascript" src="https://www.google.com/jsapi"></script>
		<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
		<script type="text/javascript" src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
		<script type="text/javascript" src="js/charts.js"></script>
		<script type="text/javascript" src="js/changesHandlers.js"></script>
		<link href="css/jquery-ui.min.css" rel="stylesheet" type="text/css" />
		<link href="css/style.css" rel="stylesheet" type="text/css" />
		<link href="css/theme.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript">
		  google.load('visualization', '1.1', {'packages':['controls']});
		  google.setOnLoadCallback(drawDefaultDashoard);
		  
		  google.load("visualization", "1.1", {packages:["corechart"]});
		</script>
	</head>
	<body>
		<div id="banner">
			<span id="suivi"><img src="images/suivi.png"/></span>
			<img id="logo" src="images/tuxedf.png"/>
			<span class="clear">&nbsp;</span>
		</div>
		
	
		<div id="tabs">
			<ul>
				<li id="r1"><a href="#tabs-1">Puissance</a></li>
				<li id="r2"><a href="#tabs-2">Consommation</a></li>
				<li id="r3"><a href="#tabs-3">Infos tarifs</a></li>
			</ul>
			<div id="tabs-1">
				<div id="buttons">
					<p style="text-align: center;">
						<button id="change-btn" class="dbUpd">Rafraichir</button>
					</p>
					<p style="text-align: center;">Date debut : <input type="text" size="10" id="startdate" class="datepicker"><input size="5" type="text" id="startHour" value="00:00" />&nbsp;&nbsp;&nbsp;Date fin : <input type="text" size="10" id="enddate" class="datepicker"><input type="text" size="5" id="endHour" value="23:59" />&nbsp;&nbsp;<button id="changeDates"  class="dbUpd">Ok</button></p>
				</div>
				<div id="puissance">
				  <div id="chart_div"></div>
				  <div id="filter_div"></div>
				</div>
			</div>
			<div id="tabs-2">
				<div id="conso"></div>
				<div id="consoDelta"></div>
			</div>
			<div id="tabs-3">
				<p>
					Période courante : <span id="periodValue"></span><br/><br/>
					Valeurs des tarifs :<br/>
					<table id="tableInfos">
						<tr>
							<th>Abonnement</th>
							<th>Heures pleines</th>
							<th>Heures creuses</th>
						</tr>
						<tr>
							<td id="aboValue"></td>
							<td id="hpValue"></td>
							<td id="hcValue"></td>
						</tr>
					</table>
				</p>
				
				<div id="consoDeltaPrix"></div><div id="consoDeltaPrixMois"></div><span class="clear">&nbsp;</span>
			</div>
		</div>
	</body>
</html>

