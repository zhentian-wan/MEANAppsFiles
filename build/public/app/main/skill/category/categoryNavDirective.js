function categoryNav(){function t(t){function e(t){d3.selectAll(".skills").selectAll("."+t.toLowerCase()).classed("text-warning",!0).style("font-weight","bold")}function l(){d3.selectAll(".skills").selectAll(".skill").classed("text-warning",!1).style("font-weight","normal")}var n=this,r="";t.query().$promise.then(function(t){n.tags_ununiqed=_.reduce(_.map(t,"tags"),function(t,e){return t.concat(e)},[]),n.tags=_.countBy(n.tags_ununiqed,_.identity)}),n.isActive=function(t){return r===t},n.toggleCategory=function(t){r===t?(r="",l()):(r=t,l(),e(t))},n.isSelected=function(t){return null==r?!1:new RegExp(t).test(r)}}return t.$inject=["SkillCachedService"],{replace:!0,restrict:"E",bindToController:!0,controller:t,controllerAs:"categoryCtrl",templateUrl:"/partials/main/skill/category/categoryNav"}}angular.module("app.main.skill.category",[]).directive("categoryNav",categoryNav);