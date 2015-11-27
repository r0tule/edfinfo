google.load('visualization', '1.1', {'packages':['controls']});
google.setOnLoadCallback(function () {
    angular.bootstrap(document.body, ['edfinfoApp']);
});

google.load("visualization", "1.1", {packages:["corechart"]});

var edfinfoApp = angular.module('edfinfoApp', ['ui.router', 'ui.bootstrap']);

edfinfoApp.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){

		$stateProvider.state('/', {
			url: '',
			views: {
				"puissance" : {templateUrl: "templates/puissance.html"},
				"conso" : {templateUrl: "templates/conso.html"},
				"tarifs" : {templateUrl: "templates/tarifs.html", controller: "tarifsCtrl" },
				}
		});
		$urlRouterProvider.otherwise('/');
 }]);
 

edfinfoApp.controller('edfinfoCtrl', function ($scope) {

  $scope.phones = [
    {'name': 'Nexus S',
     'snippet': 'Fast just got faster with Nexus S.'},
    {'name': 'Motorola XOOM™ with Wi-Fi',
     'snippet': 'The Next, Next Generation tablet.'},
    {'name': 'MOTOROLA XOOM™',
     'snippet': 'The Next, Next Generation tablet.'}
  ];
});
