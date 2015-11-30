edfinfoApp.directive('columnChart', function ($http) {
    return {
        restrict: 'EA',
        scope: {
			conso: "@conso",
			range: "@range"
        },
        link: function ($scope, $elm, $attr) {
            // Create the data table and instantiate the chart
            $scope.data = new google.visualization.DataTable();
            var chart = new google.visualization.ColumnChart($elm[0]);
			
			getDataAndDraw();
			
			$(window).resize(function(){
				$scope.$apply(function(){
					draw();
				});
			});
						
			$scope.$watch('range', function () {
                getDataAndDraw();
            });
			
			function getDataAndDraw() {
				$http({
					url: "getData.php",
					method: "GET",
					params: {
						conso: $scope.conso,
						days: $scope.range
					}
				}).success(function (result) {
					$scope.graphData = result;
					$scope.data = new google.visualization.DataTable($scope.graphData);	
					draw();  
				});
			}
			
			function draw() {
				options = {
					title: '',
					height : 600,
					width : $($elm[0]).parent().actual('width'),
					backgroundColor: '#FFF',
					colors : ['#375D81', '#ABC8E2'],
					curveType : 'function',
					focusTarget : 'category',
					lineWidth : '1',
					isStacked: true,
					legend : {position: 'none', maxLines: 2, alignment: 'center', textStyle: {color: '#333', fontSize: 16}},
					vAxis : {textStyle : {color : '#555', fontSize : '16'}, gridlines : {color: '#CCC', count: 'auto'}, baselineColor : '#AAA', minValue : 0},
					hAxis : {textStyle : {color : '#555'}, gridlines : {color: '#DDD'}, slantedText:true, slantedTextAngle:75}
				};
				chart.draw($scope.data, options);
			}
        }
    };
});
