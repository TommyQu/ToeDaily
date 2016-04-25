app.controller('menuCtrl', function($scope, $ionicModal, $location) {
	$ionicModal.fromTemplateUrl('log-out-modal.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.openLogOutModal = function () {
		$scope.modal.show();
	};

	$scope.logOut = function () {
		var ref = new Firebase("https://toedaily.firebaseio.com");
		var result = ref.unauth();
		if(result == null) {
			$scope.modal.hide();
			$location.path("#/login");
		}
	};
});
