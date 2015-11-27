function getDataForDashBoard () {
	if ($("#startdate").val() != "" && $("#enddate").val() != "") {
		return {puissance: "range", startDate: $("#startdate").val(), endDate: $("#enddate").val(), startHour: $("#startHour").val(), endHour: $("#endHour").val()};
	} else {
		return {puissance: "days", days: "1"};
	}
}

function drawDefaultDashoard () {
	drawDashboard({ puissance: "days", days: "1"});
}

function drawDashboard(dataToGet) {
	var jsonData = $.ajax({
        url: "getData.php",
		data: dataToGet,
        dataType:"json",
        async: false
        }).responseText;
	var data = new google.visualization.DataTable(jsonData);



	var dashboard = new google.visualization.Dashboard(
		    document.getElementById('puissance'));

	var rangeSlider = new google.visualization.ControlWrapper({
		  'controlType': 'ChartRangeFilter',
		  'containerId': 'filter_div',
		  'options': {
		     filterColumnLabel : 'Date',
		     ui : {chartType: 'LineChart', chartOptions: {
		                     height : 80,
		                     backgroundColor: '#FFF',
		                     colors : ['#375D81', '#ABC8E2'],
		                     curveType : 'function',
		                     focusTarget : 'category',
		                     lineWidth : '1',
		                     'legend': {'position': 'none'},
		                     'hAxis': {'textPosition': 'in'},
		                     'vAxis': {
		                       'textPosition': 'none',
		                       'gridlines': {'color': 'none'}
		                     }
		         }}
		  }
		});
		
	var lineChart = new google.visualization.ChartWrapper({
		  'chartType': 'LineChart',
		  'containerId': 'chart_div',
		  'options': {
		                     title: '',
		                     height : 600,
		                     backgroundColor: '#FFF',
		                     focusTarget : 'category',
		                     lineWidth : '1',
		                     legend : {position: 'bottom',  alignment: 'center', textStyle: {color: '#333', fontSize: 16}},
		                     vAxis : {textStyle : {color : '#555', fontSize : '16'}, gridlines : {color: '#CCC', count: 'auto'}, baselineColor : '#AAA', minValue : 0},
		                     hAxis : {textStyle : {color : '#555'}, gridlines : {color: '#DDD'}}
		  }
		});

	dashboard.bind(rangeSlider, lineChart);
	dashboard.draw(data);  

  }

function drawChart() {
	var jsonData = $.ajax({
        url: "getData.php",
		data: { conso: "", days: "365"},
        dataType:"json",
        async: false
        }).responseText;
	var data = new google.visualization.DataTable(jsonData);

	var options = {
			       title: '',
			       height : 600,
			       backgroundColor: '#FFF',
			       colors : ['#375D81', '#ABC8E2'],
			       curveType : 'function',
			       focusTarget : 'category',
			       lineWidth : '1',
			       isStacked: true,
			       legend : {position: 'bottom',  alignment: 'center', textStyle: {color: '#333', fontSize: 16}},
			       vAxis : {textStyle : {color : '#555', fontSize : '16'}, gridlines : {color: '#CCC', count: 'auto'}, baselineColor : '#AAA', minValue : 0},
			       hAxis : {textStyle : {color : '#555'}, gridlines : {color: '#DDD'}}
			  };
	var chart = new google.visualization.ColumnChart(document.getElementById("conso"));
	chart.draw(data, options);
}

function drawChartDelta() {
	var jsonData = $.ajax({
        url: "getData.php",
		data: { consoDelta: "", days: "365"},
        dataType:"json",
        async: false
        }).responseText;
	var data = new google.visualization.DataTable(jsonData);

	var options = {
			       title: '',
			       height : 600,
			       backgroundColor: '#FFF',
			       colors : ['#375D81', '#ABC8E2'],
			       curveType : 'function',
			       focusTarget : 'category',
			       lineWidth : '1',
			       isStacked: true,
			       legend : {position: 'bottom',  alignment: 'center', textStyle: {color: '#333', fontSize: 16}},
			       vAxis : {textStyle : {color : '#555', fontSize : '16'}, gridlines : {color: '#CCC', count: 'auto'}, baselineColor : '#AAA', minValue : 0},
			       hAxis : {textStyle : {color : '#555'}, gridlines : {color: '#DDD'}}
			  };
	var chart = new google.visualization.ColumnChart(document.getElementById("consoDelta"));
	chart.draw(data, options);
}

function drawChartDeltaPrix() {
	var jsonData = $.ajax({
        url: "getData.php",
		data: { consoDeltaPrix: "", days: "365"},
        dataType:"json",
        async: false
        }).responseText;
	var data = new google.visualization.DataTable(jsonData);

	var options = {
			       title: '',
			       height : 600,
			       backgroundColor: '#FFF',
			       colors : ['#375D81', '#ABC8E2'],
			       curveType : 'function',
			       focusTarget : 'category',
			       lineWidth : '1',
			       isStacked: true,
			       legend : {position: 'bottom',  alignment: 'center', textStyle: {color: '#333', fontSize: 16}},
			       vAxis : {textStyle : {color : '#555', fontSize : '16'}, gridlines : {color: '#CCC', count: 'auto'}, baselineColor : '#AAA', minValue : 0},
			       hAxis : {textStyle : {color : '#555'}, gridlines : {color: '#DDD'}}
			  };
	var chart = new google.visualization.ColumnChart(document.getElementById("consoDeltaPrix"));
	chart.draw(data, options);
}

function drawChartDeltaPrixMois() {
	var jsonData = $.ajax({
        url: "getData.php",
		data: { consoDeltaPrixMois: "", days: "365"},
        dataType:"json",
        async: false
        }).responseText;
	var data = new google.visualization.DataTable(jsonData);

	var options = {
			       title: '',
			       height : 600,
			       backgroundColor: '#FFF',
			       colors : ['#375D81', '#ABC8E2'],
			       curveType : 'function',
			       focusTarget : 'category',
			       lineWidth : '1',
			       isStacked: true,
			       legend : {position: 'bottom',  alignment: 'center', textStyle: {color: '#333', fontSize: 16}},
			       vAxis : {textStyle : {color : '#555', fontSize : '16'}, gridlines : {color: '#CCC', count: 'auto'}, baselineColor : '#AAA', minValue : 0},
			       hAxis : {textStyle : {color : '#555'}, gridlines : {color: '#DDD'}}
			  };
	var chart = new google.visualization.ColumnChart(document.getElementById("consoDeltaPrixMois"));
	chart.draw(data, options);
}