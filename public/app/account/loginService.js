

function loginService($http, $q, IdentityFactory){

    var service = {};

    function extract(res){
        return res.data;
    }

    service.login = function(username, password) {

        return $q(function(resolve, reject){
            $http.post('/login', {
                username: username,
                password: password
            }).then(extract)
                .then(function(response){
                    if(response.success){
                        IdentityFactory.currentUser = response.user;
                        resolve(true);
                    }else{
                        resolve(false);
                    }
                });
        });
    };

    service.logoutUser = function() {

        return $q(function(resolve, reject) {
            $http.post('/logout', {logout: true}).then(function() {
                IdentityFactory.currentUser = undefined;
                resolve();
            });
        });
    };

    return service;
}

angular.module('app')

    .service('loginService', loginService);