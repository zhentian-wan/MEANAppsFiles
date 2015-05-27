/**
 * Created by Answer1215 on 5/12/2015.
 */
function IdentityFactory($window, UserResource) {

    var factory = {},
        currentUser;

    if($window.bootstrappedUserObject) {

        currentUser = new UserResource();
        angular.extend(currentUser, $window.bootstrappedUserObject);
    }

    factory.currentUser = currentUser;

    factory.isAuthed = function() {
        return !!factory.currentUser;
    };
    factory.isAuthorized = function(role) {
        if(factory.currentUser && factory.currentUser.role.indexOf(role) > -1) {
            return true;
        } else {
            return false;
        }
    }

    return factory;
}

angular.module('app.models.user-models')

    .factory('IdentityFactory', IdentityFactory);