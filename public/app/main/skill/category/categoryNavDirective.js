/**
 * Created by Answer1215 on 6/10/2015.
 */

function categoryNav() {

    function categoryController(SkillCachedService) {
        var vm = this;

        SkillCachedService.query().$promise.then(function(skills) {
            vm.tags = _.uniq(_.reduce(_.map(skills, 'tags'), function(flattened, other) {
                return flattened.concat(other);
            }, []));
        });
    }

    return {
        replace: true,
        restrict: "E",
        bindToController: true,
        controller: categoryController,
        controllerAs: 'cateCtrl',
        templateUrl: '/partials/main/skill/category/categoryNav'
    }
}

angular.module('app.main.skill.category', [])

    .directive('categoryNav', categoryNav);