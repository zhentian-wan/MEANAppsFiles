/**
 * Created by Answer1215 on 5/14/2015.
 */
function usrListController(UserResource) {

    var vm = this;
    vm.users = UserResource.query(); //get all the users
    console.log(vm.users);
}

angular.module('app')

    .controller('usrListController', usrListController);