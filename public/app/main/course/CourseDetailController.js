/**
 * Created by Answer1215 on 5/19/2015.
 */

function CourseDetailController($routeParams, CourseCachedService, $stateParams) {
    var vm = this;
    vm.course = {};

    CourseCachedService.query().$promise.then(function(courses) {
        vm.course = _.find(courses, {'_id': $stateParams.id});
    })
}

angular.module('app.main.course')

    .config(function($stateProvider) {
        $stateProvider.state('app.courses.course-detail', {
            url: '/:id',
            views: {
                'main@': {
                    templateUrl: '/partials/main/course/course_detail',
                    controller: 'CourseDetailController'
                }
            }
        })
    })

    .controller('CourseDetailController', CourseDetailController);