'use strict';

angular.module('questionnaire3')
    .component('questionnaire3', {
        templateUrl: 'pages/questionnaire3/questionnaire3.template.html',
        controller: ['Questionnaire3Service', '$routeParams', '$location',
            function HrQuestionnaire3(Questionnaire3Service, $routeParams, $location) {

                var _this = this,
                    select = document.querySelectorAll('select');

                _this.question_number = $routeParams.question_number;

                Questionnaire3Service.get({question_number: $routeParams.question_number}).$promise.then(function (result) {
                    _this.result = result;
                });

                var validation = function () {
                    var sum = null,
                        answer_block = 0;

                    for (var i = 0; i <= select.length - 1; i++) {
                        var item = +(select[i].value);
                        sum = sum + item;

                        if (item !== 0) {
                            answer_block += 1;
                        }
                    }
                    return {
                        sum,
                        answer_block
                    }
                };

                var answer_questionnaire = function () {
                    var answer = [];

                    for (var i = 0; i <= select.length - 1; i++) {
                        answer.push( +(select[i].value) )
                    }

                    return answer;

                };

                _this.clickbutton = function () {

                    _this.validation = validation();
                    var answer = answer_questionnaire();


                    if (_this.result.next_question && _this.validation.sum === 10 && _this.validation.answer_block <= 4) {

                        $location.path(`/questionnaire3/${+(_this.question_number) + 1}`);

                        Questionnaire3Service.save({

                            answer,
                            question_number: $routeParams.question_number

                        }).$promise.then(function () {

                        }, function (error) {
                            _this.error = error;
                        });

                    } else if (_this.validation.answer_block > 4) {

                        document.getElementById('error-type-1').style.display = 'none';
                        document.getElementById('error-type-2').style.display = 'block';

                    } else if (_this.validation.sum !== 10) {

                        document.getElementById('error-type-1').style.display = 'block';
                        document.getElementById('error-type-2').style.display = 'none';

                    } else {

                        Questionnaire3Service.save({

                            answer,
                            question_number: $routeParams.question_number

                        }).$promise.then(function () {

                        }, function (error) {
                            _this.error = error;
                        });

                        $location.path(`/questionnaireend`);

                    }

                }
            }]
    });