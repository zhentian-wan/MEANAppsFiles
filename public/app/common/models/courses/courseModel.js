/**
 * Created by Answer1215 on 5/18/2015.
 */

function CourseService($resource) {
    var Course = $resource('/api/courses/:_id', {_id: "@id"}, {
        update: {method: 'PUT', isArray: false}
    });

    return Course;
}

function CourseCachedService(CourseService) {
    var courseList;

    return {
        query: function() {
            if(!courseList) {
                courseList = CourseService.query();
            }

            return courseList;
        }
    };
}

angular.module('app.models.course-models', [])

    .service('CourseService', CourseService)
    .service('CourseCachedService', CourseCachedService);
