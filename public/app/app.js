function AppController($rootScope, NOT_AUTHORIZED, $location, $state) {

    $rootScope.$on('$routeChangeError', function(event, current, previous, rejction) {
        if(rejction === NOT_AUTHORIZED) {
            $state.go('app');
        }
    });

    $rootScope.$on('$viewContentLoaded', function() {
        var tl = new TimelineLite();
        var w = $('.jumbotron>.avatar').width();
        tl.fromTo($('.jumbotron>h1'), 0.7, {marginLeft: '500px', alpha: 0}, {
            marginLeft: 0,
            alpha: 1,
            ease: Ease.easeInOut
        })
            .fromTo($('.jumbotron>blockquote'), 0.7, {marginLeft: '400px', alpha: 0}, {
                marginLeft: 0,
                alpha: 1,
                ease: Ease.easeInOut
            })
            .fromTo($('.jumbotron>.avatar'), 0.7, {alpha: 0}, {
                alpha: 1
            });
    });
}

function localeSelectorDirective() {

    function languageController($translate) {
        // Get active locale even if not loaded yet:
        var vm = this;
        vm.locale = $translate.proposedLanguage() || "en";

        vm.setLocale = function() {
            $translate.use(vm.locale);
        };
    }

    return {
        restrict: 'C',
        replace: true,
        bindToController: true,
        controller: languageController,
        controllerAs: "langCtrl",
        templateUrl: 'partials/main/languages'
    };
}

function appConfig($compileProvider,
                   $httpProvider,
                   $stateProvider,
                   $urlRouterProvider,
                   $translateProvider,
                   GravatarProvider) {

    $httpProvider.useApplyAsync(true);
    $compileProvider.debugInfoEnabled(false);
    $translateProvider.useCookieStorage();
    $translateProvider.useUrlLoader('/api/lang');
    $translateProvider.preferredLanguage('en');
    //$translateProvider.useSanitizeValueStrategy('sanitize');
    $stateProvider.state('app', {
        url: '',
        abstract: true
    });

    $urlRouterProvider.otherwise(function($injector, $location) {
        $location.path('/');
    });

    GravatarProvider.setSize(200);
}

angular.module('app', [
    'ngResource',
    'ngFx',
    'ngAnimate',
    'formly',
    'formlyBootstrap',
    'ui.router',
    'ngSanitize',
    'ngCookies',
    'pascalprecht.translate',
    'app.main',
    'app.user',
    'ngGravatar'
])
    .config(appConfig)
    .value('NOT_AUTHORIZED', 'Not authorized')
    .value('EMAIL', 'answer881215@gmail.com')
    .controller('AppController', AppController)
    .directive('localeSelector', localeSelectorDirective)
;

