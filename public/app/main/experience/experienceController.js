/**
 * Created by Answer1215 on 6/13/2015.
 */

function ExperienceController(ExperienceCachedService) {

    var vm = this;

    vm.experiences = ExperienceCachedService.query();
    console.log(vm.experiences);
}

angular.module('app.main.experience', [
    'app.models.experience-models'
]) 
    .controller('ExperienceController', ExperienceController)
;