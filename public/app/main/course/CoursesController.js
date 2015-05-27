/**
 * Created by Answer1215 on 5/18/2015.
 */

function CoursesController(CourseCachedService) {

    var vm = this;
    vm.courses = CourseCachedService.query();

    vm.sortOptions = [{value: "title", text: "Sort by Title"},
        {value: "published", text: "Sort by Publish Date"}];

    vm.sortOrder = vm.sortOptions[0].value;
}

angular.module('app.main.course', [
    'app.models.course-models'
])

    .config(function($stateProvider) {
        $stateProvider.state('app.courses', {
            url: '/courses',
            views: {
                'main@': {
                    templateUrl: '/partials/main/course/course_list',
                    controller: 'CoursesController'
                }
            }
        })
    })

    .controller('CoursesController', CoursesController);