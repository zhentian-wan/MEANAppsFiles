/**
 * Created by Answer1215 on 6/15/2015.
 */

function AdminController($state) {
    $state.go('app.admin.users');
}

function appAdminConfig($stateProvider) {

    var userRoleCheck = {
        admin: {
            auth: function(loginService) {
                return loginService.authorizeCurrentUserForRoute('admin');
            }
        }
    };

    $stateProvider.state('app.admin', {
        url: '/admin',
        views: {
            'main@': {
                templateUrl: '/partials/admin/adminPage',
                controller: 'AdminController',
                resolve: userRoleCheck.admin
            }
        }
    });
}

angular.module('app.admin', [
    'app.admin.users',
    'app.admin.skills'
])

    .config(appAdminConfig)
    .controller('AdminController', AdminController);