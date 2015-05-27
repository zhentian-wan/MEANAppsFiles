function AppController($rootScope, NOT_AUTHORIZED, $location) {
    $rootScope.$on('$routeChangeError', function(event, current, previous, rejction) {
        if(rejction === NOT_AUTHORIZED) {
            $location.path('/');
        }
    })
}


angular.module('app', [
    'ngResource',
    'ngRoute',
    'ngAnimate',
    'ui.router',
    'app.main',
    'app.user'])

    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider.state('app', {
            url: '',
            abstract: true
        });

        $urlRouterProvider.otherwise('/');
    })

    .value('NOT_AUTHORIZED', 'Not authorized')

    .controller('AppController', AppController);

