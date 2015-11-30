edfinfoApp.controller('puissanceCtrl', function ($scope, $http, $element) {
	// TimePicker
	$scope.startTime = new Date(2015, 1, 1, 0, 0, 0, 0);
	$scope.endTime = new Date(2015, 1, 1, 23, 59, 0, 0);
	$scope.hstep = 1;
	$scope.mstep = 1;
	$scope.ismeridian = false;
	

	// DatePicker
	$scope.maxDate = new Date();
	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1
	};
	$scope.dtFin = new Date();
	$scope.dtDebut = new Date();
	
	$scope.refreshData = function () {
		$http({
			url: "getData.php",
			method: "GET",
			params: {
				puissance: "range",
				startDate: $scope.dtDebut.getDate() + "-" + ($scope.dtDebut.getMonth()+1) + "-" + $scope.dtDebut.getFullYear() + " " + $scope.startTime.getHours() + ":" + $scope.startTime.getMinutes(),
				endDate: $scope.dtFin.getDate() + "-" + ($scope.dtFin.getMonth()+1) + "-" + $scope.dtFin.getFullYear() + " " + $scope.endTime.getHours() + ":" + $scope.endTime.getMinutes()
				}
		}).success(function (result) {
			$scope.data = new google.visualization.DataTable(result);	
			dashboard.draw($scope.data); 
		});
	}
  
	// DashBoard
  	$scope.data = ''
	$http({
        url: "getData.php",
		method: "GET",
		params: { puissance: "days", days: "1"}
	}).success(function (result) {
		$scope.data = new google.visualization.DataTable(result);	
		dashboard.draw($scope.data);  
	});
	
	$(window).resize(function(){
		$scope.$apply(function(){
			dashboard.draw($scope.data);
		});
	});

	var dashboard = new google.visualization.Dashboard($element);

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
});