'use strict';

function questionnaire2Ctrl(Questionnaire3Service, $routeParams, $location) {

    var vm = this,
        answer,
        select = document.querySelectorAll('select');

    vm.question_number = $routeParams.question_number;

    //получаем вопросы из БД

    Questionnaire3Service.resource.get({question_number: vm.question_number}).$promise.then(function (result) {
        vm.result = result;
    });

    // передаем ответ в БД и переходим на следующий вопрос

    vm.clickButton = function () {

        // Проверка на правильность заполнения блока утверждений:
        // 1) Сумма баллов всех блоков должна быть равна 10
        // 2) Количество утверждений на которе можно дать оценку в блоке не должно превышать 4

        vm.validation = Questionnaire3Service.validation(select);

        // Запись ответов с одного блока в массив

        answer = Questionnaire3Service.answer_questionnaire(select);

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

            // Показуем ошибку если оценка данна больше чем на 4 утверджения

        } else if (vm.validation.answer_block > 4) {

            document.getElementById('error-type-1').style.display = 'none';
            document.getElementById('error-type-2').style.display = 'block';

            // Показуем ошибку если сумма баллов не равна 10

        } else if (vm.validation.sum !== 10) {

            document.getElementById('error-type-1').style.display = 'block';
            document.getElementById('error-type-2').style.display = 'none';

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
        controller: ('Questionnaire2Ctrl', ['Questionnaire3Service', '$routeParams', '$location', questionnaire2Ctrl])

    });