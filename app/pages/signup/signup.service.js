'use strict';

function signupService($resource, API_CONFIG) {
    return $resource(API_CONFIG.URL + 'signup', {}, {});
}


angular
    .module('signup.service', [
        'ngResource',
        'api.config'
    ])
    .factory('SignupService', ['$resource', 'API_CONFIG', signupService]);
