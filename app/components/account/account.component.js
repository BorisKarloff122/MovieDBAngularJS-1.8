var account = angular.module('account',['ngRoute']);


account.component('account', {
    controller: accountController,
    templateUrl: 'components/account/account.component.html'
});

function accountController($scope) {
    $scope.savedMovies = JSON.parse(localStorage.getItem('favs'));

    $scope.removeFromFavorites = function removeFromFavorites(index) {
        $scope.savedMovies.splice(index,1);
        localStorage.setItem('favs', JSON.stringify($scope.savedMovies));
    };
}
