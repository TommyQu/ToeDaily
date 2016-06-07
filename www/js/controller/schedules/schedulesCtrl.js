var loginUserEmail = window.localStorage.getItem("loginUserEmail");
var schedules;

app.controller('schedulesCtrl', function($scope, $ionicModal, $firebaseArray) {

	var scheduleRef = new Firebase("https://toedaily.firebaseio.com/schedule");
	schedules = $firebaseArray(scheduleRef);

	//Calendar
	$scope.calendar = {};

    $scope.changeMode = function (mode) {
        $scope.calendar.mode = mode;
    };

    $scope.calendar.eventSource = loadAllSchedules();

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
		schedule.startTime = $("#schedule-start-time").html().toString();
		schedule.endTime = $("#schedule-end-time").html().toString();

		var result = schedules.$add({
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

	function loadAllSchedules() {
		var events = [];
		schedules.$loaded().then(function(){
		    angular.forEach(schedules, function(schedule) {
		    	var startTime = new Date(schedule.startTime.substring(0,4), schedule.startTime.substring(5,7), schedule.startTime.substring(8,10), schedule.startTime.substring(11,12), schedule.startTime.substring(13,15));
		    	var endTime = new Date(schedule.endTime.substring(0,4), schedule.endTime.substring(5,7), schedule.endTime.substring(8,10), schedule.endTime.substring(11,12), schedule.endTime.substring(13,15));
		        console.log(schedule.startTime.substring(13,15));
		        events.push({
		        	title: schedule.title,
		        	startTime: startTime,
		        	endTime: endTime,
		        	allDay: false
		        });
		    })
		    $scope.$broadcast('eventSourceChanged',$scope.calendar.eventSource);
	    });
	    return events;
	}
});
