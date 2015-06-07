/**
 * Created by Answer1215 on 5/15/2015.
 */
function SignupController(loginService, Toast, $location, SignupFormFactory) {
    var vm = this;

    vm.signupForm = {};
    vm.model = {};
    vm.fields = SignupFormFactory.fields;

    vm.signup = function() {

        vm.newUserData = {
            username: vm.model.username,
            email: vm.model.email,
            firstName: vm.model.fname,
            lastName: vm.model.lname,
            password: vm.model.password
        };

        if(vm.model.username && vm.model.password && vm.model.email && vm.model.lname && vm.model.fname) {
            loginService.createNewUser(vm.newUserData).then(function() {
                Toast.success('Your users has been created!');
                $location.path('/');
            }, function(reason) {
                Toast.error(reason);
            })
        }
    }
}

angular.module('app.user')

    .controller('SignupController', SignupController);