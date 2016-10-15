'use strict';

function questionnaire2Service ($resource, API_CONFIG) {

    var resource = $resource(API_CONFIG.URL + 'questionnaire/57a44ad73420027d90aa7785/question/:question_number', {
        question_number: '@question_number'
    }, {});


    return {
        resource: resource,
        answer_questionnaire: answer_questionnaire
    };

    // Запись ответов с блока в массив

    function answer_questionnaire(value) {

        var answer = [];

        for (var i = 0; i <= value.length - 1; i++) {

            var item = value[i];

            //Проверка ответа на undefined, если undefined записываем в ответ 0.

            if (item === undefined) {
                answer.push(0)
            } else {
                answer.push(item)
            }
        }

        return answer;
    }
    
}

angular
    .module('questionnaire2.service', [
        'ngResource',
        'api.config'
    ])
    .factory('Questionnaire2Service', ['$resource', 'API_CONFIG', questionnaire2Service]);