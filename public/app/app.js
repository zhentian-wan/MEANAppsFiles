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

function localeSelectorDirective() {

    function languageController($translate) {
        // Get active locale even if not loaded yet:
        var vm = this;
        vm.locale = $translate.proposedLanguage() || "en";

        vm.setLocale = function() {
            $translate.use(vm.locale);
            console.log(vm.locale);
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

function appConfig($compileProvider, $httpProvider, $stateProvider, $urlRouterProvider, $translateProvider) {

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

    $urlRouterProvider.otherwise('/');
}

angular.module('app', [
    'ngResource',
    'ngAnimate',
    'formly',
    'formlyBootstrap',
    'ui.router',
    'ngSanitize',
    'ngCookies',
    'pascalprecht.translate',
    'app.main',
    'app.user'])
    .config(appConfig)
    .value('NOT_AUTHORIZED', 'Not authorized')
    .controller('AppController', AppController)
   // .controller('languageController', languageController)
    .directive('localeSelector', localeSelectorDirective)
;

