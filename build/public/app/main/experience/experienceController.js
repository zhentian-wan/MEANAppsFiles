function ExperienceController(e){var r=this;r.experiences=e.query(),console.log(r.experiences)}ExperienceController.$inject=["ExperienceCachedService"],angular.module("app.main.experience",["app.models.experience-models"]).controller("ExperienceController",ExperienceController);