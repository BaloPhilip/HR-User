'use strict';

function questionnaire2Ctrl(Questionnaire2Service, $routeParams, $location) {

    var vm = this,
        answer;

    vm.question_number = $routeParams.question_number;
    vm.showError = false;


    //получаем вопросы из БД

    Questionnaire2Service.get({question_number: vm.question_number}).$promise.then(function (result) {

        vm.result = result;

    });

    // передаем ответ в БД и переходим на следующий вопрос

    vm.clickButton = function () {

        var question_value_1 = +(document.getElementById('select-0').value),
            question_value_2 = +(document.getElementById('select-1').value);

        answer = [question_value_1, question_value_2];

        // если с БД пришел next_question = true и сумма баллов во всех блоках равна 5
        // переходим на следующий вопрос, если next_question = false вопросы в тесте закончились
        // переходим на следующий тест

        if (((question_value_1 + question_value_2) === 5) && (vm.result.next_question)) {

            $location.path(`/questionnaire2/${+(vm.question_number) + 1}`);

            // сохраняем ответ в БД

            Questionnaire2Service.save({

                answer,
                question_number: vm.question_number

            }).$promise.then(function () {

            }, function (error) {
                vm.error = error;
            });

        // если сумма баллов во всех блоках не равна 5, отображаем ошибку

        } else if (((question_value_1 + question_value_2) !== 5)) {

            vm.showError = true;

            // document.getElementById('error-type').style.display = 'block';

        } else {

            // сохраняем ответ в БД

            Questionnaire2Service.save({

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
