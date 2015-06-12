/**
 * Created by Answer1215 on 6/10/2015.
 */

function categoryNav() {

    function categoryController(SkillCachedService) {
        var vm = this,
            activateCategory = "";

        SkillCachedService.query().$promise.then(function(skills) {

            // all tags
            vm.tags_ununiqed = _.reduce(_.map(skills, 'tags'), function(flattened, other) {
                return flattened.concat(other);
            }, []);

            vm.tags = _.countBy(vm.tags_ununiqed, _.identity);
        });

        vm.isActive = function(key) {

            return activateCategory === key;
        };

        vm.toggleCategory = function(key) {

            if(activateCategory === key) {
                activateCategory = "";
                unHighlightAll();
            } else {
                activateCategory = key;
                unHighlightAll();
                hightlight(key);
            }
        };

        vm.isSelected = function(key) {

            if(activateCategory == null) {
                return false;
            }

            return new RegExp(key).test(activateCategory);
        };

        function hightlight(key) {

            d3.selectAll('.skills')
                .selectAll('.' + key.toLowerCase())
                .classed('text-warning', true)
                .style('font-weight', 'bold');
        }

        function unHighlightAll() {
            d3.selectAll('.skills')
                .selectAll('.skill')
                .classed('text-warning', false)
                .style('font-weight', 'normal');
        }
    }

    return {
        replace: true,
        restrict: "E",
        bindToController: true,
        controller: categoryController,
        controllerAs: 'categoryCtrl',
        templateUrl: '/partials/main/skill/category/categoryNav'
    }
}

angular.module('app.main.skill.category', [])

    .directive('categoryNav', categoryNav);