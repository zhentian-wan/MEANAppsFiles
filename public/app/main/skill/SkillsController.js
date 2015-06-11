/**
 * Created by Answer1215 on 5/18/2015.
 */

function SkillsController(SkillCachedService) {

    var vm = this;
    vm.skills = SkillCachedService.query();

    vm.sortOptions = [{value: "title", text: "Sort by Title"},
        {value: "published", text: "Sort by Knowing Date"}];

    vm.sortOrder = vm.sortOptions[0].value;
}

function appMainSkillConfig($stateProvider) {
    $stateProvider.state('app.skills', {
        url: '/skills',
        views: {
            'main@': {
                templateUrl: '/partials/main/skill/skill_list',
                controller: 'SkillsController'
            }
        }
    });
}

angular.module('app.main.skill', [
    'app.models.skill-models',
    'app.main.skill.category'
])

    .config(appMainSkillConfig)
    .controller('SkillsController', SkillsController);