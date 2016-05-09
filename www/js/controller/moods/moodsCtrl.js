var loginUserEmail = window.localStorage.getItem("loginUserEmail");

app.factory("Mood", function($firebaseArray) {
	var moodRef = new Firebase("https://toedaily.firebaseio.com/mood");
	return $firebaseArray(moodRef.orderByChild("createdBy").equalTo(loginUserEmail));
});

app.controller('moodsCtrl', function($scope, $ionicModal, $firebaseArray, Mood) {

	$scope.allMoods = Mood;
	$ionicModal.fromTemplateUrl('view/moods/newMoods.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.openNewMoodsModal = function() {
		$scope.modal.show();
	};

	$scope.newMoods = function(mood) {
		var currentdate = new Date(); 
		var createdAt = currentdate.getFullYear() + "-" 
			+ (currentdate.getMonth()+1) + "-"
			+ currentdate.getDate() + " "
			+ currentdate.getHours() + ":"
			+ currentdate.getMinutes() + ":"
			+ currentdate.getSeconds();
		mood.createdAt = createdAt;
		$scope.mood = Mood;
		mood.createdBy = loginUserEmail;
		var result = $scope.mood.$add({
			"type": mood.type,
			"content": mood.content,
			"createdAt": mood.createdAt,
			"createdBy": mood.createdBy
		});
		if(result != "" && result != null) {
			alert("Create mood successfully!");
			$scope.modal.hide();
		}
		else {
			alert("Error!");
		}
	};
});
