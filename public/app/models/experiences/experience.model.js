/**
 * Created by Answer1215 on 5/18/2015.
 */

function ExperienceService($resource) {
    var Experience = $resource('/api/experiences/:_id', {_id: "@id"}, {
        update: {method: 'PUT', isArray: false}
    });

    return Experience;
}

function ExperienceCachedService(ExperienceService) {
    var experienceList;

    return {
        query: function() {
            if(!experienceList) {
                experienceList = ExperienceService.query();
            }

            return experienceList;
        }
    };
}

angular.module('app.models.experience-models', [])
    .service('ExperienceService', ExperienceService)
    .service('ExperienceCachedService', ExperienceCachedService);
