/**
 * Created by Answer1215 on 5/18/2015.
 */

function SkillService($resource) {
    var Skill = $resource('/api/skills/:_id', {_id: "@id"}, {
        update: {method: 'PUT', isArray: false}
    });

    return Skill;
}

function SkillCachedService(SkillService) {
    var skillList;

    return {
        query: function() {
            if(!skillList) {
                skillList = SkillService.query();
            }

            return skillList;
        }
    };
}

angular.module('app.models.skill-models', [])

    .service('SkillService', SkillService)
    .service('SkillCachedService', SkillCachedService);
