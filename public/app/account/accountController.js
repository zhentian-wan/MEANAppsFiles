/**
 * Created by Answer1215 on 5/11/2015.
 */
function AccountController() {
    var vm = this;

    vm.signin = function(username, password) {
        console.log("signin called", username, password);
    }
}

angular.module('app')

    .controller('AccountController', AccountController);