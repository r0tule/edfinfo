edfinfoApp.controller('tarifsCtrl', function ($scope, $http) {
	$scope.periode = 'NA'
	
	$http.get("ptec.txt").success(function(response) {
		$scope.periode = response.replace(/\.+/, '');
	});
	
	$http({
		url: "getData.php",
		method: "GET",
		params: {tarifs:'', date: 'today'}
		})
	.success(function(response) {
		$scope.tarifs = response;
	});
	
	$scope.range = daysInMonth(new Date());
	
	function daysInMonth(anyDateInMonth) {
		return new Date(anyDateInMonth.getYear(), 
						anyDateInMonth.getMonth()+1, 
						0).getDate();}
});