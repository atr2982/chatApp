'use strict';

angular.module('smsApp', ['firebase', 'ngMaterial', 'angular-md5', 'ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/auth');

        $stateProvider
            .state('auth', {
                url: '/auth',
                templateUrl: 'views/authView.html',
                controller: 'AuthController as auth'
            })
            .state('status', {
                url: '/status',
                templateUrl: 'views/statusView.html',
                controller: 'StatusController as status'
            })
            .state('error', {
                url: '/error',
                templateUrl: 'views/errorView.html',
                controller: 'StatusController as status'
            });
    })
    .run(function ($rootScope, $state, User) {

        $rootScope.$on('$stateChangeStart', function () {
            var loggedInUser = User.getLoggedInUser();

            if (loggedInUser) {

                $rootScope.loggedInUserData = User.getUserData(loggedInUser.uid);
            }
        });
    });