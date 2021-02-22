angular.module('myApp', [
    'cards',
    'list',
    'header',
    'footer'
]).config(function($routeProvider) {
    $routeProvider.when('/account',
        {
            templateUrl: '',
            controller: 'QuestionController'
        });
    $routeProvider.when('/',
        {
            templateUrl: '',
            controller: 'AnswerController'
        });
});


