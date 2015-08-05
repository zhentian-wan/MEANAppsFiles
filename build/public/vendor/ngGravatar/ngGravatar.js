/**
 * Created by Answer1215 on 6/17/2015.
 */
angular.module('ngGravatar', []);
angular.module('ngGravatar').directive('gravatar', function(Gravatar) {
   return {
       replace: true,
       restrict: "E",
       template: "<img ng-src='{{gravatarUrl()}}'>",
       scope: {
            email: '='
        },
       link: function(scope) {
            scope.gravatarUrl = function() {
                return Gravatar(scope.email);
            }
       }
   }
});

angular.module('ngGravatar').provider('Gravatar', function() {
    var imageSize = 50;
    var url = "http://www.gravatar.com/avatar/";

    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    };

    this.setSize = function(value) {
        imageSize = value;
    };

    this.$get = function() {
        return function(email) {
            if(validateEmail(email)){
                return url + CryptoJS.MD5(email) + "?size=" + imageSize.toString();
            }
        }
    };
});