
var myApp = angular.module('userApp', []);

myApp.controller('Controler', ['$scope', '$http', function ($scope, $http) {

    $scope.users = [];
    $scope.added = {};
    
    $scope.addUser = function () {
        var added = $scope.added;
        added.index = $scope.users.length;
        added.name = "-";
        added.index_number = "-";
        added.php = 0;
        added.js = 0;
        added.jq = 0;
        added.sum = 0;
        $scope.users.push(added);
        $scope.added = {};
    };

    $scope.deleteUser = function (user) {
        $scope.users.splice(user.index, 1); 
        setIndexForAll();
    };

    function setIndexForAll() {
        $scope.users.forEach(function (user, index) {
            user.index = index;
        });
    }

    $scope.Sum = function (user) {
        return user.php + user.jq + user.js;
    }

    $scope.SumJs = function () {
        var sum = 0;
        $scope.users.forEach(function (user) {
            sum += user.js;
        });
        return sum;
    }

    $scope.SumJQ = function () {
        var sum = 0;
        $scope.users.forEach(function (user) {
            sum += user.jq;
        });
        return sum;
    }

    $scope.SumPhp = function () {
        var sum = 0;
        $scope.users.forEach(function (user) {
            sum += user.php;
        });
        return sum;
    }

    $scope.TotalSum = function () {
        var sum = 0;
        $scope.users.forEach(function (user) {
            sum += user.php + user.jq + user.js;
        });
        return sum;
    }
    
    $http.get('users.json').success(function (user) {
        $scope.users = user;
    });
    
}]);


myApp.directive('contenteditable', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            element.bind('blur', function () {
                scope.$apply(function () {
                    if (element.toggleClass()[0].outerHTML.includes("index")) {
                        if (element.html().length > 6) {
                            element.html('-');
                        }
                    }
                    if (!element.toggleClass()[0].outerHTML.includes("name")) {
                        if (isNaN(parseInt(element.html())) || element.html().includes('/^[\d]+$/')) {
                            element.html(0);
                        }

                        ngModel.$setViewValue(parseInt(element.html()));
                    }
                });
            });
        }
        
    }
    
});
