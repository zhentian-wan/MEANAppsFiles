/**
 * Created by Answer1215 on 5/11/2015.
 */
function MainController(SkillCachedService) {
    var vm = this;

    vm.skills = SkillCachedService.query();
}

angular.module('app.main', [
    'app.main.skill'
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
