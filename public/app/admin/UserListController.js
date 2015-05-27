/**
 * Created by Answer1215 on 5/14/2015.
 */
function usrListController(UserResource, AdminService, ToastFactory) {

    var vm = this;
    vm.users = UserResource.query(); //get all the users

    vm.removeUser = function(user) {
        if(user){

            var b = prompt("Are you sure to delete this user?");

            if(b != null){
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
}

angular.module('app')

    .controller('usrListController', usrListController);