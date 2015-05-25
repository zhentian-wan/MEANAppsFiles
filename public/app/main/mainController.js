/**
 * Created by Answer1215 on 5/11/2015.
 */
function MainController(CourseCachedService) {
    var vm = this;

    vm.courses = CourseCachedService.query();
}

angular.module('app')
    .controller('MainController', MainController);
