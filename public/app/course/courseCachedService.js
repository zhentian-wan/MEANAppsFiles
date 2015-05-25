/**
 * Created by Answer1215 on 5/18/2015.
 */

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

angular.module('app')

    .service('CourseCachedService', CourseCachedService);