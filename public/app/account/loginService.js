

function loginService($http, $q, IdentityFactory, UserResource, NOT_AUTHORIZED){

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
                        //Use user resource
                        var user = new UserResource();
                        //extend user object by adding user info
                        angular.extend(user, response.user);
                        IdentityFactory.currentUser = user;
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

    service.authorizeCurrentUserForRoute = function(role)  {

        if(IdentityFactory.isAuthorized(role)){
            return true;
        }else{
            console.log("should reject");
            return $q.reject(NOT_AUTHORIZED);
        }
    };

    return service;
}

angular.module('app')

    .service('loginService', loginService);