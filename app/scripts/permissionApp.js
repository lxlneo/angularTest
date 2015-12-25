var app = angular.module('permissionApp', ['ngRoute']);
    app.config(["$routeProvider", function ($routeProvider) {
   /*配置路由*/
   $routeProvider
       .when("/a", {
           template: "<div><h1>controllerA</h1> <a href='#/b'>gotoB</a></div>",
           controller: 'controllerA',
           resolve:{
             test:function(){
               console.log("resolve");
             }
           }
       })
       .when("/b", {
             template: "<div><h1>controllerB</h1> <a href='#/a'>gotoA</a></div>",
           controller: "controllerB"
       }).otherwise({redirectTo: "/a"});
     }]).run(['$rootScope','$location',function($rootScope,$location){
           $rootScope.$on('$routeChangeStart',function(evt, next, previous){
             console.log(next ,previous);

             if(next && next.$$route && next.$$route.originalPath === '/b'){
                  evt.preventDefault();
                 alert("跳不过去了");
                //$location.path(previous.$$route.originalPath);
             }else{
                 $location.path(next.$$route.originalPath);
             }
             //console.log("routeChangeStart");
           });
     }])
 .controller('controllerA', function($scope) {
     console.log("controllerA");
     $scope.greeting = 'Welcome! controllerA';
 })
 .controller('controllerB', function($scope) {
      console.log("controllerB");
      $scope.greeting = 'Welcome! controllerB';
 });
