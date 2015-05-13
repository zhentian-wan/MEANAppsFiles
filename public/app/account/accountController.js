/**
 * Created by Answer1215 on 5/11/2015.
 */
function AccountController(loginService, ToastFactory, IdentityFactory) {
    var vm = this;

    vm.signin = function(username, password) {
        loginService.login(username, password).then(function(status){
            if(status){
                ToastFactory.success('Logged in!');
            }else{
                ToastFactory.warning("Cannot log in!");
            }
        })
    }

    vm.isAuthed = function() {
        return IdentityFactory.isAuthed();
    }
}

angular.module('app')

    .controller('AccountController', AccountController);