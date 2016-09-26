'use strict';

angular
    .module('signup.service', [
        'ngResource',
        'api.config'
    ])
    .factory('SignupService', ['$resource', 'API_CONFIG',
        function ($resource, API_CONFIG) {
            return $resource(API_CONFIG.URL + 'signup', {}, {});
        }
    ]);