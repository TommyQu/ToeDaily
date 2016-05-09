app.factory("User", function($firebaseArray) {
  var userRef = new Firebase("https://toedaily.firebaseio.com/user");
  return $firebaseArray(userRef);
});

app.controller('signUpCtrl', function($scope, $filter, User) {

    $scope.signUp = function(user) {
      var ref = new Firebase("https://toedaily.firebaseio.com");
      ref.createUser({
        email    : user.email,
        password : user.password
      }, function(error, userData) {
        if (error) {
          alert(error);
        } else {
          alert("Successfully created user account with uid:", userData.uid);
          window.history.back();
        }
      });
     //  $scope.user = User;
    	// var result = $scope.user.$add({
     //    	"email": user.email,
     //      "nickname": user.nickname,
     //    	"password": user.password,
     //      "gender": user.gender,
     //    	"dob": dob
     //  	});
     //  alert(result);
    };
});