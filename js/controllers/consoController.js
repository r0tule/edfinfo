edfinfoApp.controller('consoCtrl', function ($scope) {
	$scope.range = daysInMonth(new Date());
	
	function daysInMonth(anyDateInMonth) {
		return new Date(anyDateInMonth.getYear(), 
						anyDateInMonth.getMonth()+1, 
						0).getDate();}
});