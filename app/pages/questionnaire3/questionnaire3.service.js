'use strict';

function questionnaire3Service($resource, API_CONFIG) {

    var resource = $resource(API_CONFIG.URL + 'questionnaire/57a44ae93420027d90aa7786/question/:question_number', {
        question_number: '@question_number'
    }, {});

    return {
        resource: resource,
        validation: validation,
        answer_questionnaire: answer_questionnaire
    };

    // Проверка формы заполнения блока

    function validation(value) {

        var sum = null,
            answer_block = 0;

        for (var i = 0; i <= value.length - 1; i++) {

            var item = value[i];

            if (item !== undefined) {

                sum = sum + item;

                if (item !== 0) {
                    answer_block += 1;
                }
            }
        }

        return {
            sum,
            answer_block
        }
    }

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
    .module('questionnaire3.service', [
        'ngResource',
        'api.config'
    ])
    .factory('Questionnaire3Service', ['$resource', 'API_CONFIG', questionnaire3Service]);