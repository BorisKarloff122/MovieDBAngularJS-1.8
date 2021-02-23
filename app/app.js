angular.module('myApp', [
    'account',
    'cards',
    'list',
    'header',
    'footer',
    'ngRoute',
]);


angular.module('myApp').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/',
            {
                template:'<list-block></list-block>',

            }).when('/account',
            {
                template:'<account></account>',
            });
    }]);
