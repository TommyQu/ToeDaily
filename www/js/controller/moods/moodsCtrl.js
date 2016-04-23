app.controller('moodsCtrl', function($scope, $ionicModal) {
	$ionicModal.fromTemplateUrl('view/moods/newMoods.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.openNewMoodsModal = function() {
    	$scope.modal.show();
  	};
});
