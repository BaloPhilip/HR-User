'use strict';

angular
    .module('questionnaire3.service', [
        'ngResource',
        'api.config'
    ])
    .factory('Questionnaire3Service', ['$resource', 'API_CONFIG',
        function ($resource, API_CONFIG) {
            return $resource(API_CONFIG.URL + 'questionnaire/57a44ae93420027d90aa7786/question/:question_number', {
                question_number: '@question_number'
            }, {});
        }
    ]);