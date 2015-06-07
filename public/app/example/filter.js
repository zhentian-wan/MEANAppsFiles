/**
 * Created by Answer1215 on 5/30/2015.
 */
angular.module('filter', [])

    .filter('titleCase', function() {
        return function(val) {
            return val?val.replace(/\w\S*/g, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }) : val;
        };
    });