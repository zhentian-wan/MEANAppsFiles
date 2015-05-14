
function AccountController(loginService, ToastFactory, IdentityFactory, $location) {
    var vm = this;

    vm.user = IdentityFactory.currentUser;

    vm.signin = function(username, password) {
        loginService.login(username, password).then(function(status){
            if(status){
                vm.user = IdentityFactory.currentUser;
                ToastFactory.success('Logged in!');
            }else{
                ToastFactory.warning("Cannot log in!");
            }
        })
    };

    vm.signout = function() {
        loginService.logoutUser().then(function() {
            vm.username = null;
            vm.password = null;
            vm.user = null;
            ToastFactory.success('Successfully logged out!');
            $location.path('/');
        });
    };

    vm.isAuthed = function() {
        return IdentityFactory.isAuthed();
    };
}

angular.module('app')

    .controller('AccountController', AccountController);