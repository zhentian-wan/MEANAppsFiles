function AdminService(e){var n={};return n.removeUser=function(n){var i=angular.copy(n);return console.log(i),e(function(e,n){i.$delete({id:i._id}).then(function(){e(!0)},function(e){n(e.data.reason)})})},n}AdminService.$inject=["$q"],angular.module("app.models.admin-models",[]).service("AdminService",AdminService);