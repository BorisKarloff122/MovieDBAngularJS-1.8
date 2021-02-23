const cards = angular.module('cards', []);

cards.service('dataService', function () {

    return {
        movie: {},
        movies: {},
    };
});

cards.component('card', {
    templateUrl: 'components/card/card.component.html',
    bindings:{
        'movies':'='
    },
    controller: cardController
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
    if(localStorage.getItem('favs') === null){
        localStorage.setItem('favs', JSON.stringify([]));
    }
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

    $scope.$on('nextChange', function (event, data) {
        $scope.movie = data;
        $scope.$broadcast('movieChange', dataService.movie);
    });

    $scope.$on('prevChange', function (event, data) {
        $scope.movie = data;
        $scope.$broadcast('movieChange', dataService.movie);
    });

    $scope.$on('movieChange', function (event, data) {
        $scope.movie = data;
        $scope.openModal = true;
        $scope.fire();
    });

    $scope.fire = function(){
        $scope.dataService.movies = this.movies;
        setTimeout(function () {
            $scope.$broadcast('moviesChange', dataService.movies);
        },0);
    };

    $scope.close = function () {
      $scope.openModal = false;
    };
}


cards.controller('switchController', function ($scope, dataService) {
    $scope.$on('moviesChange', function (event, data) {
        $scope.findIndex(data);
        $scope.movies = data;

        $scope.nextMovie = function () {
            if($scope.indexVar === $scope.movies.length - 1){
                $scope.dataService.movie = $scope.dataService.movies[0];
            }
            else{
                $scope.dataService.movie = $scope.dataService.movies[$scope.indexVar + 1];
            }
            $scope.$emit('nextChange', dataService.movie);
        };

        $scope.previousMovie = function () {
            if ($scope.indexVar === 0){
                $scope.dataService.movie = $scope.dataService.movies[$scope.movies.length - 1];
            }
            else{
                $scope.dataService.movie = $scope.dataService.movies[$scope.indexVar - 1];
            }
            $scope.$emit('prevChange', dataService.movie);
        };
    });


    $scope.testFavorites = function(){
        $scope.savedMovies = JSON.parse(localStorage.getItem('favs'));
        const title = $scope.dataService.movie.title;
        if ($scope.savedMovies.indexOf($scope.savedMovies.find((entry) => entry.title === title)) !== -1){
            $scope.favor = 'Remove from favorites';
        }
        else{
            $scope.favor = 'Add to favorites';
        }
    };

    $scope.favorites = function() {
        $scope.savedMovies = JSON.parse(localStorage.getItem('favs'));
        const title = $scope.dataService.movie.title;
        if ($scope.savedMovies.indexOf($scope.savedMovies.find((entry) => entry.title === title)) !== -1){
            $scope.savedMovies.splice($scope.indexVar, 1);
            localStorage.setItem('favs', JSON.stringify($scope.savedMovies));
            $scope.favor = 'Add to favorites';
        }
        else{
            $scope.savedMovies.push(dataService.movie);
            localStorage.setItem('favs', JSON.stringify($scope.savedMovies));
            $scope.favor = 'Remove from favorites';
        }
    };

    $scope.findIndex = function(data){
        const title = $scope.dataService.movie.title;
        $scope.indexVar = data.indexOf(data.find((entry) => entry.title === title));
        $scope.testFavorites();
    };
});

cards.filter('imgTemplate', function () {
    return function (text) {
        return 'http://image.tmdb.org/t/p/w342' + text;
    };
});



