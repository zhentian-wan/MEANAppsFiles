function ary2str(){return function(n){return n.join(" ").toLowerCase()}}function admin(){var n={isAdmin:function(n){return n?n.role&&n.role.indexOf("admin")>-1:!1},isntAdmin:function(r){return r?!n.isAdmin(r):!1}};return function(r,i){return n[i](r)}}angular.module("app").filter("ary2str",ary2str).filter("admin",admin).filter("user");