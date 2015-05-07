function MainController() {
    var vm = this;

    vm.greeting = "AngularJS";
}

angular.module('app', ['ngResource', 'ngRoute'])

    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/partials/main',
                controller: 'MainController',
                controllerAs: 'mainCtrl'
            })
    })

    .controller('MainController', MainController);