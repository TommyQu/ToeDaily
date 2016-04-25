app.controller('homeCtrl', function($scope, $state, $cordovaGeolocation) {

	var posOptions = {timeout: 1000, enableHighAccuracy: false};
	$cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
		var lat  = position.coords.latitude;
		var lon = position.coords.longitude;
		$.getJSON("http://api.openweathermap.org/data/2.5/forecast/weather?lat="+lat+"&lon="+lon+"&APPID=356cb0594ebdf6b8bf26324cf7ef43c1",function(json){
			var result = JSON.stringify(json);
			$scope.city = json.city.name;
			console.log(result);
			$state.go($state.current, {}, {reload: true});
			// console.log(result);
		});
	}, function(err) {
      // error
  	});

});
