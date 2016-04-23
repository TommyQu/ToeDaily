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
				console.log("Authenticated successfully with payload:", authData);
				window.location.href = "#/app/home";
			}
		});
	};
});
