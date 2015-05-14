/**
 * Created by Answer1215 on 5/12/2015.
 */
function IdentityFactory($window) {

    var factory = {},
        currentUser;

    if($window.bootstrappedUserObject ){
        currentUser = $window.bootstrappedUserObject;
    }

    factory.currentUser = currentUser;
    factory.isAuthed = function() {
        return  !!factory.currentUser;
    };

    return factory;
}

angular.module('app')

    .factory('IdentityFactory', IdentityFactory);