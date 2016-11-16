
angular.module('app')

.controller("Ctrl", function($scope, Srvc, Util) {
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
	    		$scope.visibleData = temp;
	    		$scope.totalDisplayed = 20;
	    		$scope.allDone = $scope.totalDisplayed >= $scope.visibleData.length;
	    	}
	    });
	});

	$scope.minLat;
	$scope.maxLat;
	$scope.minLng;
	$scope.maxLng;
	$scope.filterForm = {};
	$scope.queryForm = {};
	$scope.queryForm.queryBy = "$";
	$scope.queryForm.query = {};

	$scope.updateDates = function() {
		$scope.filterForm.endDates = $scope.filterForm.startDates.filter(function(d) {
			return d >= $scope.filterForm.startingDate;
		});
	};

	$scope.loadMore = function() {
		$scope.totalDisplayed += 20;
		$scope.allDone = $scope.totalDisplayed >= $scope.visibleData.length;
	};

	$scope.goTo = function(lat, lng) {
		var loc = new google.maps.LatLng(lat, lng);
		$scope.map.setZoom(20);
		$scope.map.panTo(loc);
	};

	// This will be called anytime the high level data parameters change
	// (begin/end, crime type, any other filter options that we want)
	$scope.updateMap = function() {
		// Srvc.filterData.then(function(data) {
		// 	console.log(data)
		// });
	};

	$scope.clearTopLevel = function() {
		$scope.filterForm.startingDate = "";
		$scope.filterForm.endingDate = "";
		$scope.filterForm.type = "";
		// updateMap()
	};

	$scope.clearQuery = function() {
		$scope.queryForm.queryBy = "$";
		$scope.queryForm.query = {};
	};

	var markers = [];
	var datesObject = {};
	var typesObject = {};
	var openWindow;
	Srvc.getData().then(function(data) {
		$scope.highData = data;
		data.forEach(function(d, i) {
			var iw = new google.maps.InfoWindow({
				content: "<span class='iwtype'>" + d.Type + "</span><span class='iwdate'>" + Util.formatDate(d.Date) + "</span>" +
					"<hr class='iwhr' />" +
					"<span class='iwcomm'>" + d.Community + "</span><br />" +
					d.Block + "<br />" +
					d.Desc + "<br />"
			});
			datesObject[d.Date.getFullYear()] = 1;
			typesObject[d.Type] = 1;
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
		//console.log(_.groupBy($scope.highData, 'Community'))
		$scope.filterForm.startDates = Util.toArray(datesObject);
		$scope.filterForm.types = Util.toArray(typesObject);
		var cluster = new MarkerClusterer($scope.map, markers, {imagePath: 'images/m'});
	});
});
