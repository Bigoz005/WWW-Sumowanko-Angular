// Tworzymy moduł aplikacji
var myApp = angular.module('userApp', []);

// Tworzymy kotroler UserCtrl
myApp.controller('UserCtrl', ['$scope', '$http', function($scope, $http) {  

// tworzymy model
$scope.users = [];
$scope.newUser = {};  

// zasilamy danymi z pliku JSON  
$http.get('users.json').success(function(data) { 
  $scope.users = data;
  _setIndexes();
}); 
$scope.addUser = function() {
    var newUser = $scope.newUser;
    newUser.state = "normal"; 
    newUser.index = $scope.users.length;
    $scope.users.push(newUser); 
    $scope.newUser = {};
};  

$scope.deleteUser = function(user) {
   if (user.state == "deleted") {
      $scope.users.splice(user.index, 1); 
     _setIndexes();
   } else {
      user.state = "deleted"; 
   }
};  

$scope.undoDelete = function(user) {
   user.state = "normal"; 
}; 
 $scope.editUser = function(user) {
    user.oldName = user.name; 
    user.oldAddress = user.address;
    user.oldPhoneNumber = user.phone_number; 
    user.state = "edit";
};

$scope.saveUser = function(user) {
    // tu możemy użyć Ajaxowego  POST do zapisu danych 
   user.state = "normal"; 
}; 

$scope.cancelEdit = function(user) { 
   user.name = user.oldName; 
   user.address = user.oldAddress;
    user.phone_number = user.oldPhoneNumber;
    user.state = "normal";  }; 

 // metody prywatne
function _setIndexes() { 
   $scope.users.forEach(function(user, index) {
      user.index = index; 
});  }}]);
