'use strict';

angular
    .module('signup', [
        'signup.service'
    ])
    .component('signup', {
        templateUrl: 'pages/signup/signup.template.html',
        controller: ['SignupService', '$location', '$http', function SingUp(SignupService, $location, $http) {
            var _this = this;

            _this.signup = function (signupform, user) {

                if (signupform.$valid) {

                    SignupService.save(user).$promise.then(function (result) {

                        $http.defaults.headers.common["Bearer"] = result.token;

                        $location.path('/questionnaire1description')
                    }, function (error) {
                        _this.error = error;
                        console.log('error', error);
                    })
                }
            };
        }]
    });
