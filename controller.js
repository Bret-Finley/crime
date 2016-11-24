
angular.module('app')

.controller("Ctrl", function($scope, Crime, DataSrvc, UtilSrvc, MapSrvc) {
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

	$scope.map = MapSrvc.initMap();

	$scope.visibleData = [];
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
	$scope.filterForm.communities = UtilSrvc.community;
	$scope.filterForm.startDates = UtilSrvc.dates;
	$scope.filterForm.endDates = [];
	$scope.filterForm.types = UtilSrvc.types;
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
		MapSrvc.goTo(lat, lng);
	};

	$scope.updateMap = function() {
		// clear markers
		for(var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		}
		markers = [];
		DataSrvc.getData($scope.startingDate, $scope.endingDate, $scope.selectedComms,
			$scope.selectedTypes).then(function(data) {
				$scope.highData = data.map(function(d) {
					return Crime.build(d);
				});
				MapSrvc.addMarkers($scope.highData);
		});
	};

	$scope.clearTopLevel = function() {
		$scope.filterForm.startingDate = "";
		$scope.filterForm.endingDate = "";
		$scope.filterForm.endDates = [];
		$scope.filterForm.selectedComms = [];
		$scope.filterForm.selectedTypes = [];
		// $scope.updateMap()
	};

	$scope.clearQuery = function() {
		$scope.queryForm.queryBy = "$";
		$scope.queryForm.query = {};
	};

	$scope.showMarker = function() {

	};

	$scope.clearMarkers = function() {

	};

	var markers = [];
	var openWindow;
	DataSrvc.getData(2010, 2014).then(function(data) {
		$scope.highData = data.map(function(d) {
			return Crime.build(d);
		});
		MapSrvc.addMarkers($scope.highData);
	})
});
