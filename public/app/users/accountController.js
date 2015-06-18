function AccountController(loginService, ToastFactory, IdentityFactory, $location) {
    var vm = this;
    vm.user = {};
    vm.isClicked = false;

    vm.showLogin = function() {
      vm.isClicked = true;
    };

    vm.signin = function(username, password) {
        loginService.login(username, password).then(function(status) {
            if(status) {
                vm.user = IdentityFactory.currentUser;
                ToastFactory.success('Logged in!');
            } else {
                ToastFactory.warning("Cannot log in!");
            }
        })
    };

    vm.signout = function() {
        loginService.logoutUser().then(function() {
            vm.username = null;
            vm.password = null;
            vm.user = null;
            vm.isClicked = false;
            ToastFactory.success('Successfully logged out!');
            $location.path('/');
        });
    };

    vm.isAuthed = function() {
        vm.user = IdentityFactory.currentUser;
        return IdentityFactory.isAuthed();
    };

    vm.user = IdentityFactory.currentUser;

}

function appUserConfig($stateProvider) {

    $stateProvider.state('app.signup', {
        url: '/signup',
        views: {
            'main@': {
                templateUrl: '/partials/users/signup',
                controller: 'SignupController'
            }
        }
    })
}

angular.module('app.user', [
    'app.models.user-models',
    'app.admin'
])
    .config(appUserConfig)
    .controller('AccountController', AccountController);