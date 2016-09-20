'use strict';

angular.module('questionnaire1').component('questionnaire1', {
    templateUrl: 'pages/questionnaire1/questionnaire1.template.html',

    controller: ['Questionnaire1Service', '$routeParams', '$location',
        function HrQuestionnaire1(Questionnaire1Service, $routeParams, $location) {

            var _this = this;

            _this.question_number = $routeParams.question_number;

            Questionnaire1Service.get({question_number: $routeParams.question_number}).$promise.then(function (result) {

                _this.result = result;

            });


            _this.clickbutton = function (answer) {

                if (_this.result.next_question) {
                    $location.path(`/questionnaire1/${+(_this.question_number) + 1}`);

                    Questionnaire1Service.save({

                        answer: answer,
                        question_number: $routeParams.question_number

                    }).$promise.then(function () {

                    }, function (error) {
                        _this.error = error;
                    });


                } else {

                    Questionnaire1Service.save({

                        answer: answer,
                        question_number: $routeParams.question_number

                    }).$promise.then(function () {

                    }, function (error) {
                        _this.error = error;
                    });

                    $location.path(`/questionnaire2description`);
                }

            };


        }]
});
