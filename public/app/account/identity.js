/**
 * Created by Answer1215 on 5/12/2015.
 */
function IdentityFactory() {

    var factory = {};

    factory.currentUser = undefined;
    factory.isAuthed = function() {
        return  factory.currentUser != undefined ? true: false;
    };

    return factory;
}

angular.module('app')

    .factory('IdentityFactory', IdentityFactory);