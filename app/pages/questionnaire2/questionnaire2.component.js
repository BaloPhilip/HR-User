'use strict';

angular
    .module('questionnaire2')
    .component('questionnaire2', {
        templateUrl: 'pages/questionnaire2/questionnaire2.template.html',

        controller: ['Questionnaire2Service', '$routeParams', '$location',
            function HrQuestionnaire2(Questionnaire2Service, $routeParams, $location) {

                var _this = this,
                    answer;

                _this.question_number = $routeParams.question_number;

                Questionnaire2Service.get({question_number: $routeParams.question_number}).$promise.then(function (result) {

                    _this.result = result;

                });

                _this.clickbutton = function () {

                    var question_value_1 = +(document.getElementById('select-0').value),
                        question_value_2 = +(document.getElementById('select-1').value);

                    answer = [question_value_1, question_value_2];

                    if (((question_value_1 + question_value_2) === 5) && (_this.result.next_question)) {

                        $location.path(`/questionnaire2/${+(_this.question_number) + 1}`);

                        Questionnaire2Service.save({

                            answer,
                            question_number: $routeParams.question_number

                        }).$promise.then(function () {

                        }, function (error) {
                            _this.error = error;
                            // console.log('error', _this.error);
                        });


                    } else if (((question_value_1 + question_value_2) !== 5)) {

                        document.getElementById('error-type-1').style.display = 'block';

                    } else {

                        Questionnaire2Service.save({

                            answer,
                            question_number: $routeParams.question_number

                        }).$promise.then(function () {

                        }, function (error) {
                            _this.error = error;
                        });

                        $location.path(`/questionnaire3description`);

                    }

                };

            }]
    });
