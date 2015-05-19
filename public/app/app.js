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
            },
            user:{
                auth: function(loginService) {
                    return loginService.authorizeAuthenicatedUserForRoute();
                }
            }
        };

        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: '/partials/main/main',
                controller: 'MainController'
            })
            .when('/courses', {
                templateUrl: '/partials/course/course_list',
                controller: 'CoursesController'
            })
            .when('/courses/:id', {
                templateUrl: '/partials/course/course_detail',
                controller: 'CourseDetailController'
            })
            .when('/admin/users', {
                templateUrl: '/partials/admin/user_list',
                controller: 'usrListController',
                resolve: userRoleCheck.admin
            })
            .when('/signup', {
                templateUrl: '/partials/account/signup',
                controller: 'SignupController'
            }).when('/profile', {
                templateUrl: '/partials/account/profile',
                controller: 'ProfileController',
                resolve: userRoleCheck.user
            });
    })

    .value('NOT_AUTHORIZED', 'Not authorized')

    .controller('AppController', AppController);

