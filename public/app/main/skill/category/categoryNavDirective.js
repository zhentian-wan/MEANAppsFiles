/**
 * Created by Answer1215 on 6/10/2015.
 */

function categoryNav() {

    function categoryController(SkillCachedService) {
        var vm = this,
            pre = null,
            isSelected = false;

        SkillCachedService.query().$promise.then(function(skills) {

            // all tags
            vm.tags_ununiqed = _.reduce(_.map(skills, 'tags'), function(flattened, other) {
                return flattened.concat(other);
            }, []);

            vm.tags = _.countBy(vm.tags_ununiqed, _.identity);
        });

        vm.highlight = function(key) {

            if(pre == null) {
                d3.selectAll('.skills')
                    .selectAll('.' + key.toLowerCase())
                    .classed('text-warning', true);
            } else {

                if(pre == key) {
                    d3.selectAll('.skills')
                        .selectAll('.text-warning')
                        .classed('text-warning', false);
                } else {
                    d3.selectAll('.skills')
                        .selectAll('.text-warning')
                        .classed('text-warning', false);

                    d3.selectAll('.skills')
                        .selectAll('.' + key.toLowerCase())
                        .classed('text-warning', true);
                }
            }

            pre = key;
        };

        vm.isSelected = function(key) {

            if(pre == null) {
                return false;
            }

            return new RegExp(key).test(pre);
        }
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

    .directive('categoryNav', categoryNav)

    .filter('ary2str', function() {
        return function(arr) {
            return arr.join(' ').toLowerCase();
        }

    });