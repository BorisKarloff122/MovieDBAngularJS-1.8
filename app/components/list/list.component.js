const list = angular.module('list', ['ngRoute']);

list.component('listBlock', {
   templateUrl: 'components/list/list.component.html',
    controller: function ctrler ($http, $scope) {
        $scope.baseURLAddress = 'https://api.themoviedb.org/3/movie/now_playing';
        $scope.idPath = 'https://api.themoviedb.org/3/movie/';
        $scope.key = 'ebea8cfca72fdff8d2624ad7bbf78e4c';
        $scope.loaded = false;

       this.$onInit = function () {
            $scope.getMovies();
       };

       $scope.getMovies = function() {
            $http({method: 'GET', url: $scope.baseURLAddress + '?api_key=' + $scope.key  + '&language=ru_RU' + 'page=' + 1 }).
            then(function success(response) {
                $scope.loaded = true;
                $scope.resp =(response.data.results);
            });
        };
    }
});
