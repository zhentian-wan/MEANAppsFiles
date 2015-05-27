/**
 * Created by Answer1215 on 5/11/2015.
 */
function MainController(CourseCachedService) {
    var vm = this;

    vm.courses = CourseCachedService.query();
}

angular.module('app.main', [
    'app.main.course'
])

    .config(function($stateProvider) {
        $stateProvider.state('app.main', {
            url: '/',
            views: {
                'main@': {
                    templateUrl: '/partials/main/main',
                    controller: 'MainController'
                }
            }
        })
    })

    .controller('MainController', MainController);
