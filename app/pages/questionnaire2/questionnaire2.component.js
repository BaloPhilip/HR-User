'use strict';

function questionnaire2Ctrl(Questionnaire2Service, $routeParams, $location) {

    var vm = this,
        answer;
    vm.valuesOption = [1, 2, 3, 4, 5];
    vm.question_number = $routeParams.question_number;
    vm.showError = false;

    //получаем вопросы из БД

    Questionnaire2Service.resource.get({question_number: vm.question_number}).$promise.then(function (result) {

        vm.result = result;

    });

    // передаем ответ в БД и переходим на следующий вопрос

    vm.clickButton = function () {

        var allValues = [
            vm.val1,
            vm.val2
        ];

        // Запись ответов с блока

        answer = Questionnaire2Service.answer_questionnaire(allValues);

        // если с БД пришел next_question = true и сумма баллов во всех блоках равна 5
        // переходим на следующий вопрос, если next_question = false вопросы в тесте закончились
        // переходим на следующий тест

        if (((answer[0] + answer[1]) === 5) && (vm.result.next_question)) {

            $location.path(`/questionnaire2/${+(vm.question_number) + 1}`);

            // сохраняем ответ в БД

            Questionnaire2Service.resource.save({

                answer,
                question_number: vm.question_number

            }).$promise.then(function () {

            }, function (error) {
                vm.error = error;
            });

            // если сумма баллов во всех блоках не равна 5, отображаем ошибку

        } else if (((answer[0] + answer[1]) !== 5)) {

            vm.showError = true;

        } else {

            // сохраняем ответ в БД

            Questionnaire2Service.resource.save({

                answer,
                question_number: vm.question_number

            }).$promise.then(function () {

            }, function (error) {
                vm.error = error;
            });

            // переход на описание следующего теста

            $location.path(`/questionnaire3description`);

        }

    };

}

angular
    .module('questionnaire2')
    .component('questionnaire2', {
        templateUrl: 'pages/questionnaire2/questionnaire2.template.html',
        controller: ('Questionnaire2Ctrl', ['Questionnaire2Service', '$routeParams', '$location', questionnaire2Ctrl])
    });
