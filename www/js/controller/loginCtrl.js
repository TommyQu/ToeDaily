app.controller('loginCtrl', function($scope, $location) {

	$scope.login = function(user) {
		var ref = new Firebase("https://toedaily.firebaseio.com");
		ref.authWithPassword({
			email    : user.email,
			password : user.password
		}, function(error, authData) {
			if (error) {
				alert(error);
			} else {
				window.localStorage.setItem("loginUserEmail", authData.auth.token.email);
				window.location.href = "#/app/home";
			}
		});
	};
});
