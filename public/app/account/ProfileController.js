/**
 * Created by Answer1215 on 5/17/2015.
 */
function ProfileController(IdentityFactory, loginService, Toast) {

    var vm = this;

    vm.username = IdentityFactory.currentUser.username;
    vm.fname = IdentityFactory.currentUser.firstName;
    vm.lname = IdentityFactory.currentUser.lastName;

    vm.updateProfile = function() {
        var userData = {
            username: vm.username,
            firstName: vm.fname,
            lastName: vm.lname
        };

        if(vm.password && vm.password.length > 0) {
            userData.password = vm.password;
        }

        loginService.updateProfile(userData).then(function() {
            Toast.success('User profile has been updated!');
        }, function(reason) {
            Toast.error(reason)
        })
    };
}

angular.module('app')

    .controller('ProfileController', ProfileController);