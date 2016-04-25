// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('ToeDaily', ['ionic', 'ionic-datepicker', 'firebase', 'ngCordova']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
//       Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//       for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

//       Don't remove this line unless you know what you are doing. It stops the viewport
//       from snapping when text inputs are focused. Ionic handles this internally for
//       a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'login.html',
          controller: 'loginCtrl'
        })

        .state('signUp', {
          url: '/signUp',
          templateUrl: 'signUp.html',
          controller: 'signUpCtrl'
        })

        .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'view/menu.html',
          controller: 'menuCtrl'
        })

        .state('app.home', {
          url: '/home',
          views: {
            'menuContent': {
              templateUrl: 'view/home.html',
              controller: 'homeCtrl'
            }
          }
        })

        .state('app.moods', {
          cache: false,
          url: '/moods',
          views: {
            'menuContent': {
              templateUrl: 'view/moods/moods.html',
              controller: 'moodsCtrl'
            }
          }
        })

        .state('app.schedules', {
          url: '/schedules',
          views: {
            'menuContent': {
              templateUrl: 'view/schedules/schedules.html'
            }
          }
        })

        .state('app.notes', {
          url: '/notes',
          views: {
            'menuContent': {
              templateUrl: 'view/notes/notes.html'
            }
          }
        });

  $urlRouterProvider.otherwise('/login');

});

document.addEventListener("deviceready", function () {
  $cordovaPlugin.someFunction().then(success, error);
}, false);

function success() {
  alert("aa");
};