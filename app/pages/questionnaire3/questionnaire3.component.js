'use strict';

function questionnaire2Ctrl(Questionnaire3Service, $routeParams, $location) {

    var vm = this,
        answer;

    vm.valuesOption = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    vm.question_number = $routeParams.question_number;

    //получаем вопросы из БД
    Questionnaire3Service.resource.get({question_number: vm.question_number}).$promise.then(function (result) {
        vm.result = result;
    });

    // передаем ответ в БД и переходим на следующий вопрос
    vm.clickButton = function () {

        // numberAnswer, numberAnswerEmpty, blockAnswer используются для отображения ошибок
        vm.numberAnswer = false;
        vm.numberAnswerEmpty = false;
        vm.blockAnswer = false;

        // Получаем ответы пользователя на утверждения из блока
        var allValues = [
            vm.val1,
            vm.val2,
            vm.val3,
            vm.val4,
            vm.val5,
            vm.val6,
            vm.val7,
            vm.val8
        ];

        // Проверка на правильность заполнения блока утверждений:
        // 1) Сумма баллов всех блоков должна быть равна 10
        // 2) Количество утверждений на которе можно дать оценку в блоке не должно превышать 4
        vm.validation = Questionnaire3Service.validation(allValues);

        // Запись ответов с блока
        answer = Questionnaire3Service.answer_questionnaire(allValues);

        // если с БД пришел next_question = true, сумма баллов во всех утверждениях равна 10 и
        // полученно оценок на 4 утверждени переходим на следующий вопрос,
        // если next_question = false вопросы в тесте закончились
        // переходим на следующий тест

        if (vm.result.next_question && vm.validation.sum === 10 && vm.validation.answer_block <= 4) {

            $location.path(`/questionnaire3/${+(vm.question_number) + 1}`);

            // сохраняем ответ в БД
            Questionnaire3Service.resource.save({

                answer,
                question_number: vm.question_number

            }).$promise.then(function () {

            }, function (error) {
                vm.error = error;
            });

        // Показываем ошибку если оценка дана больше чем на 4 утверджения
        } else if (vm.validation.answer_block > 4) {

            vm.blockAnswer = true;

        // Показываем ошибку если сумма баллов не равна 10
        } else if (vm.validation.sum !== 10 && vm.validation.sum !== null) {

            vm.numberAnswer = true;

        // Показываем ошибку если не дан не один ответ
        } else if (vm.validation.sum === null) {

            vm.numberAnswerEmpty = true;

        } else {

            // сохраняем ответ в БД
            Questionnaire3Service.resource.save({

                answer,
                question_number: vm.question_number

            }).$promise.then(function () {

            }, function (error) {
                vm.error = error;
            });

            // переход на описание следующего теста
            $location.path(`/questionnaireend`);
        }

    }
}

angular
    .module('questionnaire3')
    .component('questionnaire3', {
        templateUrl: 'pages/questionnaire3/questionnaire3.template.html',
        controller: ('Questionnaire2Ctrl',
            ['Questionnaire3Service', '$routeParams', '$location', questionnaire2Ctrl])

    });