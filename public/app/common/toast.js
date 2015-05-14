/**
 * Created by Answer1215 on 5/12/2015.
 */

function ToastFactory(Toast) {

    var factory = {};
    
    factory.setOptions = function() {

    };

    factory.success = function(msg) {
        Toast.success(msg);
        console.log(msg);
    };

    factory.warning = function(msg) {
        Toast.warning(msg);
    }

    factory.init = function() {
        Toast.options = {
            closeButton:  true,
            newestOnTop: false,
            showEasing: 'swing',
            hideEasing: 'linear',
            preventDuplicates: true,
            timeOut: 800
        };
    };

    factory.init();

    return factory;
}

    angular.module('app')

        .value('Toast', toastr)

        .factory('ToastFactory', ToastFactory);