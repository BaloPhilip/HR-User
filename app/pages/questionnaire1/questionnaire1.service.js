'use strict';

function questionnaire1Service ($resource, API_CONFIG) {

    return $resource(API_CONFIG.URL + 'questionnaire/57a44ac43420027d90aa7784/question/:question_number', {
        question_number: '@question_number'
    }, {});

}

angular
    .module('questionnaire1.service', [
        'ngResource',
        'api.config'
    ])
    .factory('Questionnaire1Service', ['$resource', 'API_CONFIG', questionnaire1Service]);

