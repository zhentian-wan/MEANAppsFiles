function AppController($rootScope, NOT_AUTHORIZED, $location ) {

    $rootScope.$on('$routeChangeError', function(event, current, previous, rejction) {
        if(rejction === NOT_AUTHORIZED) {
            $location.path('/');
        }
    });

    $rootScope.$on('$viewContentLoaded', function() {
        var tl = new TimelineLite();
        tl.fromTo($('.jumbotron>h1'), 0.5, {marginLeft: '300px', alpha: 0}, {
            marginLeft: 0,
            alpha: 1,
            ease: Ease.easeInOut
        })
            .fromTo($('.jumbotron>blockquote'), 0.5, {marginLeft: '200px', alpha: 0}, {
                marginLeft: 0,
                alpha: 1,
                ease: Ease.easeInOut
            });
    });
}

angular.module('app', [
    'ngResource',
    'ngAnimate',
    'formly',
    'formlyBootstrap',
    'ui.router',
    'ngSanitize',
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

    .controller('AppController', AppController)
;

