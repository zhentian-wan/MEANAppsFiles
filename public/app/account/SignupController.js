/**
 * Created by Answer1215 on 5/15/2015.
 */
function SignupController(loginService, Toast, $location, IdentityFactory) {
    var vm = this;

    vm.signup = function() {

        vm.newUserData = {
            username: vm.username,
            firstName: vm.fname,
            lastName: vm.lname,
            password: vm.password
        };

        loginService.createNewUser(vm.newUserData).then(function() {
            Toast.success('Your account has been created!');
            $location.path('/');
        }, function(reason) {
            Toast.error(reason);
        })
    }
}

angular.module('app')

    .controller('SignupController', SignupController);