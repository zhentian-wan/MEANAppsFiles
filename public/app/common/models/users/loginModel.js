

function loginService($http, $q, IdentityFactory, UserResource, NOT_AUTHORIZED){

    var service = {};

    function extract(res){
        if(res.data){
            return res.data;
        }else{
            return res;
        }
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
                        console.log(IdentityFactory.currentUser);
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
            return $q.reject(NOT_AUTHORIZED);
        }
    };
    
    service.authorizeAuthenicatedUserForRoute = function() {
        if(IdentityFactory.isAuthed()){
            return true;
        }else{
            return $q.reject(NOT_AUTHORIZED);
        }
    };

    service.createNewUser = function(newUserData) {
        var newUser = new UserResource(newUserData);
        return $q(function(resolve, reject) {
            newUser.$save().then(function() {
                IdentityFactory.currentUser = newUser;
                resolve();
            }, function(response) {
                reject(response.data.reason);
            })
        });
    };

    service.updateProfile = function(newUserData) {
        // when dealing wiht update, please clone the data to a new object
        var clone = angular.copy(IdentityFactory.currentUser);
        angular.extend(clone, newUserData);
        console.log(clone);
        return $q(function(resolve, reject) {
            clone.$update().then(function() {
                IdentityFactory.currentUser = clone;
                resolve();
            }, function(response) {
                reject(response.data.reason);
            })
        });
    };


    return service;
}

angular.module('app.models.user-models')

    .service('loginService', loginService);