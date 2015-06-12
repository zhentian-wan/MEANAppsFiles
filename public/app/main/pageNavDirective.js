/**
 * Created by Answer1215 on 6/10/2015.
 */
function pageNav() {

    function pageNavController($location) {
        var vm = this;
            vm.hash = "";

        vm.isPage = function(name) {
            return new RegExp("#" + name + "($|\/)").test("#" + vm.hash);
        };

        vm.scrollTo = function(el) {
            $("body").animate({scrollTop: $("#"+el).offset().top}, "slow");
            vm.hash = el;
        };
    }

    return {
        replace: true,
        restrict: 'EC',
        templateUrl: "/partials/main/pageNav",
        bindToController: true,
        controller: pageNavController,
        controllerAs: "navCtrl"
    }
}


angular.module('app.main')
    .directive('pageNav', pageNav);
