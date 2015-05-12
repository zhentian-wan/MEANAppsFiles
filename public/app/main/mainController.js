/**
 * Created by Answer1215 on 5/11/2015.
 */
function MainController() {
    var vm = this;

    vm.courses = [
        {name: 'C#', featured: true, published: new Date('2011', '09', '11')},
        {name: 'Java', featured: true, published: new Date('2010', '04', '28')},
        {name: 'Javascript', featured: true, published: new Date('2011', '11', '11')},
        {name: 'jQuery', featured: false, published: new Date('2015', '03', '05')},
        {name: 'Node.js', featured: true, published: new Date('2014', '05', '30')},
        {name: 'AngularJS', featured: true, published: new Date('2014', '04', '05')},
        {name: 'Backbone.js', featured: false, published: new Date('2015', '06', '05')},
        {name: 'Express', featured: true, published: new Date('2014', '09', '15')}
    ];
}

angular.module('app')
    .controller('MainController', MainController);
