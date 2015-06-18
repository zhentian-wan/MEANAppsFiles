/**
 * Created by Answer1215 on 6/16/2015.
 */

angular.module('app.admin.skills', [
])

    .config(function($stateProvider) {

        $stateProvider.state('app.admin.skills', {
            url: '/skills',
            views: {
                'admin@app.admin': {
                    templateUrl: '/partials/admin/skill_list'
                }
            }
        })
    });