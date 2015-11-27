edfinfoApp.controller('tabsCtrl', function ($scope) {

    $scope.tabs = [
        { title: "Puissance", route: "puissance", active: true },
        { title: "Consommation", route: "conso", active: false },
        { title: "Info Tarifs", route: "tarifs", active: false },
    ];

});