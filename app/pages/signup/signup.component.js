'use strict';

function singUpCtrl(SignupService, $location, $http) {
    var vm = this;

    // Получаем данные из формы регистрации

    vm.signup = function (signupform, user) {

        // Проверка правильности заполнения формы

        if (signupform.$valid) {

            //Сохранение пользователя в БД

            SignupService.save(user).$promise.then(function (result) {

                // Передача token в заголовок

                $http.defaults.headers.common["Bearer"] = result.token;

                // Переход на описание теста

                $location.path('/questionnaire1description')

            }, function (error) {
                vm.error = error;
                console.log('error', error);
            })
        }
    };
}

angular
    .module('signup')
    .component('signup', {
        templateUrl: 'pages/signup/signup.template.html',
        controller: ('SingUpCtrl', ['SignupService', '$location', '$http', singUpCtrl])
    });
