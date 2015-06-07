function AppController($rootScope, NOT_AUTHORIZED, $location) {
    $rootScope.$on('$routeChangeError', function(event, current, previous, rejction) {
        if(rejction === NOT_AUTHORIZED) {
            $location.path('/');
        }
    })
}


angular.module('app', [
    'ngResource',
    'ngAnimate',
    'formly',
    'formlyBootstrap',
    'ui.router',
    'app.main',
    'app.user'])

    .config(function($compileProvider, $httpProvider, $stateProvider, $urlRouterProvider) {

        $httpProvider.useApplyAsync(true);
        $compileProvider.debugInfoEnabled(false);

        $stateProvider.state('app', {
            url: '',
            abstract: true
        });

        $urlRouterProvider.otherwise('/');
    })

    .value('NOT_AUTHORIZED', 'Not authorized')

    .controller('AppController', AppController);

