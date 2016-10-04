'use strict';

function questionnaire2Service ($resource, API_CONFIG) {

    return $resource(API_CONFIG.URL + 'questionnaire/57a44ad73420027d90aa7785/question/:question_number', {
        question_number: '@question_number'
    }, {});
    
}

angular
    .module('questionnaire2.service', [
        'ngResource',
        'api.config'
    ])
    .factory('Questionnaire2Service', ['$resource', 'API_CONFIG', questionnaire2Service]);