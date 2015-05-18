/**
 * Created by Answer1215 on 5/14/2015.
 */
angular.module('app')

    .factory('UserResource', function($resource){
        var UserResource = $resource('/api/users/:id', {_id: "@id"}, {
            update: {
                method: 'PUT',
                isArray: false
            }
        });
        UserResource.prototype.isAdmin = function() {
            return this.role && this.role.indexOf('admin') > -1
        };

        return UserResource;
    });