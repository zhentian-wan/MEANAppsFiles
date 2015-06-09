/**
 * Created by Answer1215 on 5/26/2015.
 */

function AdminService($q) {

    var service = {};

    service.removeUser = function(user) {
        var targetUser = angular.copy(user);
        console.log(targetUser);
        return $q(function(resolve, reject) {
            targetUser.$delete({id: targetUser._id}).then(function() {
                resolve(true);
            }, function(response) {
                reject(response.data.reason);
            });
        });
    }

    return service;
}


angular.module('app.models.admin-models', [])

    .service('AdminService', AdminService);