function SignupController(e,n,o,l){var r=this;r.signupForm={},r.model={},r.fields=l.fields,r.isSubmitting=!1,r.signup=function(){r.newUserData={username:r.model.username,email:r.model.email,firstName:r.model.fname,lastName:r.model.lname,password:r.model.password},r.model.username&&r.model.password&&r.model.email&&r.model.lname&&r.model.fname&&(r.isSubmitting=!0,e.createNewUser(r.newUserData).then(function(){n.success("Your users has been created!"),o.path("/")},function(e){n.error(e)})["finally"](function(){r.isSubmitting=!1}))}}SignupController.$inject=["loginService","Toast","$location","SignupFormFactory"],angular.module("app.user").controller("SignupController",SignupController);