'use strict';

angular.module('questionnaire2description').
    component('questionnaire2description', {
    templateUrl: 'pages/questionnaire2description/questionnaire2description.template.html',
    controller: ['$location', function HrQuestionar2description($location) {
        var _this = this;

        _this.clickbutton = function() {
            $location.path('/questionnaire2/1');
        }

    }]
});
