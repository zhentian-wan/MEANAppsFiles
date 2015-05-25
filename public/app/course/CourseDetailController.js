/**
 * Created by Answer1215 on 5/19/2015.
 */

function CourseDetailController($routeParams, CourseCachedService) {
    var vm = this;
    vm.course = {};

    CourseCachedService.query().$promise.then(function(courses) {
        vm.course = _.find(courses, {'_id': $routeParams.id});
    })
}

angular.module('app')

    .controller('CourseDetailController', CourseDetailController);