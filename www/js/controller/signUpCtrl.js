app.factory("User", function($firebaseArray) {
  var userRef = new Firebase("https://toedaily.firebaseio.com/user");
  return $firebaseArray(userRef);
});

app.controller('signUpCtrl', function($scope, $filter, ionicDatePicker, User) {
    var dob;
    var ipObj1 = {
      callback: function (val) {  //Mandatory
      	var x = $filter('date')(new Date(val), "yyyy-MM-dd");;
      	$scope.dob = x;
        dob = x;
      },
      disabledDates: [            //Optional
        new Date(2016, 2, 16),
        new Date(2015, 3, 16),
        new Date(2015, 4, 16),
        new Date(2015, 5, 16),
        new Date('Wednesday, August 12, 2015'),
        new Date("08-16-2016"),
        new Date(1439676000000)
      ],
      from: new Date(2012, 1, 1), //Optional
      to: new Date(2016, 10, 30), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      disableWeekdays: [0],       //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };

    $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };

    $scope.signUp = function(user) {
    	$scope.user = User;
    	var result = $scope.user.$add({
        	"email": user.email,
        	"password": user.password,
          "gender": user.gender,
        	"dob": dob
      	});
      	alert(result);
    };
});