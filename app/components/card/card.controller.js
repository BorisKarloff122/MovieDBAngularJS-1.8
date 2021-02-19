const cards = angular.module('cards', []);

cards.component('card', {
    templateUrl: 'components/card/card.component.html',
    bindings:{
        'movies':'='
    },
    controller: cardController
});


cards.service('dataService', function () {
    return {
        movie: {},
        movies: {}
    };
});

cards.component('modalBlock', {
    templateUrl: 'components/modal/modal.component.html',
    bindings:{
         'movies':'=',
         'ouifm': '@'
    },
    controller: modalCtrl
});

function cardController($scope,$log, dataService) {
    $scope.dataService = dataService;
    $scope.details = function () {
        $scope.dataService.movie = this.movie;
        $scope.$broadcast('movieChange', dataService.movie);
    };
}

function modalCtrl($scope, dataService) {
    $scope.dataService = dataService;
    $scope.openModal = false;
    $scope.favor = 'Add to favorites';
    $scope.movies = {};

    this.$onInit = function (){
        $scope.movies = this.movies;
    };

    $scope.$on('movieChange', function (event, data) {
        $scope.movie = data;
        $scope.openModal = true;
        $scope.fire();
    });

    $scope.fire = function(){
        $scope.dataService.movies = this.movies;
        $scope.$broadcast('moviesChange', $scope.dataService.movies);
    };


    $scope.close = function () {
      $scope.openModal = false;
    };

}
cards.controller('switchController', function ($scope) {

    $scope.$on('moviesChange', function (event, data) {
        $scope.findIndex(data);
    });

    $scope.findIndex = function(data){
        alert(data);
    };

    $scope.nextMovie = function () {
        alert('next');
    };

    $scope.previousMovie = function () {
        alert('prev');
    };

});


cards.filter('imgTemplate', function () {
    return function (text) {
        return 'http://image.tmdb.org/t/p/w342' + text;
    };
});



