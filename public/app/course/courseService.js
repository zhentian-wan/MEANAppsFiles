/**
 * Created by Answer1215 on 5/18/2015.
 */

function CourseService($resource) {
    var Course = $resource('/api/courses/:_id', {_id: "@id"}, {
        update: {method: 'PUT', isArray: false}
    });

    return Course;
}

angular.module('app')

    .service('CourseService', CourseService);