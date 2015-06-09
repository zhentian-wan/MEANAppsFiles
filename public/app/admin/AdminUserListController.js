/**
 * Created by Answer1215 on 5/14/2015.
 */
function usrListController(UserResource, AdminService, ToastFactory) {

    var vm = this;
    vm.users = UserResource.query(); //get all the users

    vm.removeUser = function(user) {
        if(user) {
            var targetUser = _.find(vm.users, {_id: user._id});
            AdminService.removeUser(targetUser).then(function() {
                _.remove(vm.users, {_id: user._id});
                ToastFactory.success(targetUser.username + ' has been removed!');
            }, function(reason) {
                ToastFactory.error(targetUser.username + ' cannot be removed because ' + reason);
            });
        }
    }
}

angular.module('app.admin', [
    'app.models.admin-models'
])

    .config(function($stateProvider) {

        var userRoleCheck = {
            admin: {
                auth: function(loginService) {
                    return loginService.authorizeCurrentUserForRoute('admin');
                }
            }
        };

        $stateProvider.state('app.admin', {
            url: '/admin/users',
            views: {
                'main@': {
                    templateUrl: '/partials/admin/user_list',
                    controller: 'usrListController',
                    resolve: userRoleCheck.admin
                }
            }
        })
    })

    .controller('usrListController', usrListController);