app.controller('homeCtrl', function($scope, $state, $cordovaGeolocation, $ionicLoading) {

	$ionicLoading.show({
      template: 'Loading...'
    });
	var posOptions = {timeout: 1000, enableHighAccuracy: false};
	
	$cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
		var lat  = position.coords.latitude;
		var lon = position.coords.longitude;
		$.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lon+"&key=AIzaSyC1qBVXiqFpqwBvjvOpUVoYfTLrkvjBzRo",function(json){
			var result = JSON.stringify(json);
			var address = json.results[1].formatted_address;
			var city = address.split(",")[0];
			var state = address.split(",")[1];
			$scope.address = json.results[1].formatted_address;
			$.getJSON("https://api.wunderground.com/api/7ae3df327a9e5b28/conditions/q/"+state+"/"+city+".json",function(weatherJson){
				$scope.temp = weatherJson.current_observation.temperature_string;
				$scope.humidity = weatherJson.current_observation.relative_humidity;
				$scope.img = weatherJson.current_observation.icon_url;
				$scope.date = weatherJson.current_observation.local_time_rfc822.substring(0, 17);
				$state.go($state.current, {}, {reload: true});
				$ionicLoading.hide();
			});
		});
	}, function(err) {
      // error
  	});

});
