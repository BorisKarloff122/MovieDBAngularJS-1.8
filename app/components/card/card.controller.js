angular.module('cards', []);

angular.module('cards').component('card', {
    templateUrl: 'components/card/card.component.html',
    stylesheet: 'components/card/card.component.css',
    bindings:{
        movies:'='
    },

    controller: cardController

});


 function cardController($scope) {
    $scope.details = function (index) {
        console.log(this.movie);
    };
 }

angular.module('cards').filter('imgTemplate', function () {
    return function (text) {
        return 'http://image.tmdb.org/t/p/w342' + text;
    };
});
