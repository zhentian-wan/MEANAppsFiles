function AppController(e,a,o,r){e.$on("$routeChangeError",function(e,o,t,n){n===a&&r.go("app")}),e.$on("$viewContentLoaded",function(){{var e=new TimelineLite;$(".jumbotron>.avatar").width()}e.fromTo($(".jumbotron>h1"),.7,{marginLeft:"500px",alpha:0},{marginLeft:0,alpha:1,ease:Ease.easeInOut}).fromTo($(".jumbotron>blockquote"),.7,{marginLeft:"400px",alpha:0},{marginLeft:0,alpha:1,ease:Ease.easeInOut}).fromTo($(".jumbotron>.avatar"),.7,{alpha:0},{alpha:1})})}function localeSelectorDirective(){function e(e){var a=this;a.locale=e.proposedLanguage()||"en",a.setLocale=function(){e.use(a.locale)}}return e.$inject=["$translate"],{restrict:"C",replace:!0,bindToController:!0,controller:e,controllerAs:"langCtrl",templateUrl:"partials/main/languages"}}function appConfig(e,a,o,r,t,n){a.useApplyAsync(!0),e.debugInfoEnabled(!1),t.useCookieStorage(),t.useUrlLoader("/api/lang"),t.preferredLanguage("en"),o.state("app",{url:"","abstract":!0}),r.otherwise(function(e,a){a.path("/")}),n.setSize(200)}AppController.$inject=["$rootScope","NOT_AUTHORIZED","$location","$state"],appConfig.$inject=["$compileProvider","$httpProvider","$stateProvider","$urlRouterProvider","$translateProvider","GravatarProvider"],angular.module("app",["ngResource","ngFx","ngAnimate","formly","formlyBootstrap","ui.router","ngSanitize","ngCookies","pascalprecht.translate","app.main","app.user","ngGravatar"]).config(appConfig).value("NOT_AUTHORIZED","Not authorized").value("EMAIL","answer881215@gmail.com").controller("AppController",AppController).directive("localeSelector",localeSelectorDirective);