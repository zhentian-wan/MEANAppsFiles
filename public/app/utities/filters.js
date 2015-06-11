/**
 * Created by Answer1215 on 6/11/2015.
 */

function ary2str() {
    return function(arr) {
        return arr.join(' ').toLowerCase();
    }
}

angular.module('app')
    .filter('ary2str',ary2str);