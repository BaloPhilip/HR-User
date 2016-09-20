'use strict';

angular.module('questionnaire3description').
    component('questionnaire3description', {
    templateUrl: 'pages/questionnaire3description/questionnaire3description.template.html',
    controller: ['$location', function HrQuestionar3description($location) {
        var _this = this;

        _this.clickbutton = function() {
            $location.path('/questionnaire3/1');
        }

    }]
});
