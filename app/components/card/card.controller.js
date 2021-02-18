const cards = angular.module('cards', []);

cards.component('card', {
    templateUrl: 'components/card/card.component.html',
    bindings:{
        movies:'='
    },
    controller: cardController
});


cards.factory('dataService', function () {
    return {
        movie: {}
    };
});

cards.component('modalBlock', {
    templateUrl: 'components/modal/modal.component.html',
    controller: modalCtrl,
});




function cardController($scope, dataService) {
    $scope.dataService = dataService;
    $scope.details = function () {

        $scope.dataService.movie = this.movie;
    };

    console.log($scope.dataService.movie);
}

function modalCtrl($scope, dataService) {

}

cards.filter('imgTemplate', function () {
    return function (text) {
        return 'http://image.tmdb.org/t/p/w342' + text;
    };
});



