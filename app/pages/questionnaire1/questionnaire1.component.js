'use strict';

function questionnaire1Ctrl(Questionnaire1Service, $routeParams, $location) {

    var vm = this;
    vm.question_number = $routeParams.question_number;

    //получаем вопросы из БД

    Questionnaire1Service.get({question_number: vm.question_number}).$promise.then(function (result) {

        vm.result = result;

    });

    // передаем ответ в БД и переходим на следующий вопрос

    vm.clickButton = function (answer) {

        // если с БД пришел next_question = true, то переходим на следующий вопрос,
        // если false вопросы в тесте закончились переходим на следующий тест

        if (vm.result.next_question) {
            $location.path(`/questionnaire1/${+(vm.question_number) + 1}`);

            // сохраняем ответ в БД

            Questionnaire1Service.save({

                answer: answer,
                question_number: vm.question_number

            }).$promise.then(function () {

            }, function (error) {
                vm.error = error;
            });


        } else {

            Questionnaire1Service.save({

                answer: answer,
                question_number: vm.question_number

            }).$promise.then(function () {

            }, function (error) {
                vm.error = error;
            });

            $location.path(`/questionnaire2description`);
        }

    };

}

angular
    .module('questionnaire1')
    .component('questionnaire1', {
        templateUrl: 'pages/questionnaire1/questionnaire1.template.html',
        controller: ('Questionnaire1Ctrl', ['Questionnaire1Service', '$routeParams', '$location', questionnaire1Ctrl])

    });
