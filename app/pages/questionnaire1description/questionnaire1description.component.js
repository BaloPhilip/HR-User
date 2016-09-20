'use strict';

angular.module('questionnaire1description').
    component('questionnaire1description', {
    templateUrl: 'pages/questionnaire1description/questionnaire1description.template.html',
    controller: ['$location', function HrQuestionar1description($location) {
        var _this = this;

        _this.clickbutton = function() {
            $location.path('/questionnaire1/1');
        }

    }]
});
