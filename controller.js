
angular.module('app')

.controller("Ctrl", function($scope, Srvc) {
	function updateBounds() {
		var b = $scope.map.getBounds();
		var sw = b.getSouthWest();
		var ne = b.getNorthEast();
		$scope.minLat = sw.lat();
		$scope.minLng = sw.lng();
		$scope.maxLat = ne.lat();
		$scope.maxLng = ne.lng();
	}

	function filter() {
		return $scope.highData.filter(function(d, i) {
			return d.Latitude > $scope.minLat && 
				  d.Latitude < $scope.maxLat && 
				  d.Longitude > $scope.minLng && 
				  d.Longitude < $scope.maxLng;
		});
	}

	// This will be called anytime the high level data parameters change
	// (begin/end, crime type, any other filter options that we want)
	function updateMap() {

	}

	$scope.map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 41.754592961, lng: -87.741528537},
		zoom: 8,
	});

	$scope.visibleData = [1, 2, 3];
	google.maps.event.addListener($scope.map, 'bounds_changed', function() {
	    updateBounds();
	    $scope.$apply(function() {
	    	var temp = filter();
	    	if(temp.length != $scope.visibleData.length) {
	    		$scope.visibleData = filter();
	    		$scope.totalDisplayed = 20;
	    		$scope.allDone = $scope.totalDisplayed >= $scope.visibleData.length;
	    	}
	    });
	});

	$scope.minLat;
	$scope.maxLat;
	$scope.minLng;
	$scope.maxLng;
	$scope.startDates = [1, 2, 3, 4, 5, 6, 7, 8];
	$scope.types;

	$scope.updateDates = function() {
		console.log($scope.startingDate)
		$scope.endDates = $scope.startDates.filter(function(d) {
			return d >= $scope.startingDate;
		});
	};

	$scope.loadMore = function() {
		$scope.totalDisplayed += 20;
		$scope.allDone = $scope.totalDisplayed >= $scope.visibleData.length;
	};

	var markers = [];
	var openWindow;
	Srvc.getData().then(function(data) {
		$scope.highData = data;
		data.forEach(function(d, i) {
			var iw = new google.maps.InfoWindow({
				content: d.Type + "<hr />" +
					"Location: " + d.Block + "<br />" +
					"Date: " + d.Date.getTime() + "<br />" + 
					"Description: " + d.Desc + "<br />"
			});
			var marker = new google.maps.Marker({
				position: {
					lat: d.Latitude,
					lng: d.Longitude
				}
			});
			marker.addListener('click', function() {
				if(openWindow) {
					openWindow.close();
					openWindow = iw;
				} else {
					openWindow = iw;
				}

				// var latlng = new google.maps.LatLng(d.Latitude, d.Longitude);
				// map.panTo(latlng);
				iw.open($scope.map, marker);
			});
			markers.push(marker);
		});
		$scope.bar = "good bye"
		var cluster = new MarkerClusterer($scope.map, markers, {imagePath: 'images/m'});
	});
});