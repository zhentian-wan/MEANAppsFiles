/**
 * Created by Answer1215 on 5/19/2015.
 */

function SkillDetailController(SkillCachedService, $stateParams) {
    var vm = this;
    vm.skill = {};

    SkillCachedService.query().$promise.then(function(skills) {
        vm.skill = _.find(skills, {'_id': $stateParams.id});
    })
}

angular.module('app.main.skill')

    .config(function($stateProvider) {
        $stateProvider.state('app.skills.skill-detail', {
            url: '/:id',
            views: {
                'main@': {
                    templateUrl: '/partials/main/skill/skill_detail',
                    controller: 'SkillDetailController'
                }
            }
        })
    })

    .controller('SkillDetailController', SkillDetailController);