/**
 * Created by Answer1215 on 5/15/2015.
 */
function SignupController(loginService, Toast, $location) {
    var vm = this;

    vm.signup = function() {

        vm.newUserData = {
            username: vm.username,
            firstName: vm.fname,
            lastName: vm.lname,
            password: vm.password
        };

        loginService.createNewUser(vm.newUserData).then(function() {
            Toast.success('Your users has been created!');
            $location.path('/');
        }, function(reason) {
            Toast.error(reason);
        })
    }
}

angular.module('app.user')

    .controller('SignupController', SignupController);