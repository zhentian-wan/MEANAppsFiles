function AppController($rootScope, NOT_AUTHORIZED, $location) {
    $rootScope.$on('$routeChangeError', function(event, current, previous, rejction) {
        if(rejction === NOT_AUTHORIZED){
            $location.path('/');
        }
    })
}


angular.module('app', ['ngResource', 'ngRoute'])

    .config(function($routeProvider, $locationProvider) {

        var userRoleCheck = {
            admin: {
                auth: function(loginService) {
                    return loginService.authorizeCurrentUserForRoute('admin');
                }
            }
        };

        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: '/partials/main/main',
                controller: 'MainController'
            })
            .when('/admin/users', {
                templateUrl: '/partials/admin/user_list',
                controller: 'usrListController',
                resolve: userRoleCheck.admin
            });
    })

    .value('NOT_AUTHORIZED', 'Not authorized')

    .controller('AppController', AppController);

