var loginUserEmail = window.localStorage.getItem("loginUserEmail");

// app.factory("Mood", function($firebaseArray) {
// 	var moodRef = new Firebase("https://toedaily.firebaseio.com/mood");
// 	return $firebaseArray(moodRef.orderByChild("createdBy").equalTo(loginUserEmail));
// });

app.controller('moodsCtrl', function($scope, $ionicModal, $ionicPopup, $firebaseArray) {

	var moodRef = new Firebase("https://toedaily.firebaseio.com/mood");

	var moods = $firebaseArray(moodRef);
	$scope.allMoods = moods;

	$ionicModal.fromTemplateUrl('view/moods/newMoods.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.openNewMoodsModal = function() {
		$scope.modal.show();
		$("#mood-type").val(0);
		$("#mood-content-input").val("");
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
		mood.createdBy = loginUserEmail;
		var result = moods.$add({
			"type": mood.type,
			"content": mood.content,
			"createdAt": mood.createdAt,
			"createdBy": mood.createdBy
		});
		if(result != "" && result != null) {
			var alertPopup = $ionicPopup.alert({
				title: 'Alert!',
				template: 'Create mood successfully!'
			});
			alertPopup.then(function(res) {
				$scope.modal.hide();
			});
		}
		else {
			alert("Error!");
		}
	};

	$scope.openDeleteMoodPopup = function(mood) {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Alert',
			template: 'Do you want to delete this mood?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				var result = moods.$remove(mood);
				if(result == null)
					alert("Error occurs when delete mood!");
			}
		});
	};

});
