var loginUserEmail = window.localStorage.getItem("loginUserEmail");

app.factory("Schedule", function($firebaseArray) {
  var scheduleRef = new Firebase("https://toedaily.firebaseio.com/schedule");
  return $firebaseArray(scheduleRef);
});

app.controller('schedulesCtrl', function($scope, $ionicModal, $firebaseArray, Schedule) {

	//Calendar
	$scope.calendar = {};

    $scope.changeMode = function (mode) {
        $scope.calendar.mode = mode;
    };

	$scope.today = function () {
	    $scope.calendar.currentDate = new Date();
	};	

    $scope.onViewTitleChanged = function (title) {
        $scope.currentDate = title;
    };

	$ionicModal.fromTemplateUrl('view/schedules/newSchedule.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.openNewScheduleModal = function() {
		$scope.modal.show();
	};
 //  $scope.allMoods = Mood;

	 $scope.newSchedule = function(schedule) {
	 	var currentdate = new Date(); 
	 	var createdAt = currentdate.getFullYear() + "-" 
		 	+ (currentdate.getMonth()+1) + "-"
		 	+ currentdate.getDate() + " "
		 	+ currentdate.getHours() + ":"
		 	+ currentdate.getMinutes() + ":"
		 	+ currentdate.getSeconds();
	 	schedule.createdAt = createdAt;
	 	schedule.createdBy = loginUserEmail;
	 	$scope.schedule = Schedule;
	 	schedule.startTime = $("#schedule-start-time").html().toString();
	 	schedule.endTime = $("#schedule-end-time").html().toString();

	 	var result = $scope.schedule.$add({
	 		"title": schedule.title,
	 		"startTime": schedule.startTime.toString(),
	 		"endTime": schedule.endTime.toString(),
	 		"location": schedule.location,
	 		"memo": schedule.memo,
	 		"createdBy": schedule.createdBy
	 	});
	 	if(result != "" && result != null) {
	 		alert("Create schedule successfully!");
	 		$scope.modal.hide();
	 	}
	 	else {
	 		alert("Error!");
	 	}
	 };
});
