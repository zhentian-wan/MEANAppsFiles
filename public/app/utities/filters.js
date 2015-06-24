/**
 * Created by Answer1215 on 6/11/2015.
 */

function ary2str() {
    return function(arr) {
        return arr.join(' ').toLowerCase();
    }
}

function admin() {

    var rules = {
        isAdmin: function(user) {
            if(user){
                return user.role && user.role.indexOf('admin') > -1;
            }else{
                return false;
            }

        },
        isntAdmin: function(user) {
            if(user){
                return !rules.isAdmin(user);
            }else{
                return false;
            }
        }
    };

    return function(user, rule){
        return rules[rule](user);
    };
}

angular.module('app')
    .filter('ary2str',ary2str)
    .filter('admin', admin)
    .filter('user');