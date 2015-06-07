function AppController($rootScope, NOT_AUTHORIZED, $location) {

    var vm = this;

    $rootScope.$on('$routeChangeError', function(event, current, previous, rejction) {
        if(rejction === NOT_AUTHORIZED) {
            $location.path('/');
        }
    });

    $rootScope.$on('$viewContentLoaded', function() {

        d3.select('.jumbotron>h1')
            .style('opacity', 0)
            .transition()
            .duration(900)
            .style('opacity', 1);

        d3.select('.jumbotron>blockquote')
            .style('opacity', 0)
            .style('margin', '0 200px 21px')
            .transition()
            .duration(900)
            .delay(400)
            .style('opacity', 1)
            .style('margin', '0 0px 21px');
    });
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

