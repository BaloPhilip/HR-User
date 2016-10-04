'use strict';

angular
    .module('hrApp')
    .config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider
                .when('/signup', {
                    template: '<signup></signup>'
                })
                .when('/questionnaire1description', {
                    template: '<questionnaire1description></questionnaire1description>'
                })
                .when('/questionnaire1/:question_number', {
                    template: '<questionnaire1></questionnaire1>'
                })
                .when('/questionnaire2description', {
                    template: '<questionnaire2description></questionnaire2description>'
                })
                .when('/questionnaire2/:question_number', {
                    template: '<questionnaire2></questionnaire2>'
                })
                .when('/questionnaire3description', {
                    template: '<questionnaire3description></questionnaire3description>'
                })
                .when('/questionnaire3/:question_number', {
                    template: '<questionnaire3></questionnaire3>'
                })
                .when('/questionnaireend', {
                    template: '<questionnaireend></questionnaireend>'
                })
                .otherwise('/signup');
        }
    ]);
