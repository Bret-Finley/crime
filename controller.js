
angular.module('app')

.controller("Ctrl", function($scope, $timeout, Crime, DataSrvc, UtilSrvc, MapSrvc) {
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
		if(!$scope.highData) return $scope.visibleData;
		return $scope.highData.filter(function(d, i) {
			return d.Latitude > $scope.minLat &&
				  d.Latitude < $scope.maxLat &&
				  d.Longitude > $scope.minLng &&
				  d.Longitude < $scope.maxLng;
		});
	}

	function mapChange() {
		updateBounds();
	    $timeout(function() {
	    	var temp = filter();
	    	if(temp.length != $scope.visibleData.length) {
	    		$scope.visibleData = temp;
	    		$scope.totalDisplayed = 20;
	    		$scope.allDone = $scope.totalDisplayed >= $scope.visibleData.length;
	    	}
	    });
	}

	function reset() {
		$scope.filterForm.startingDate = "2010";
		$scope.filterForm.endingDate = "2014";
		$scope.filterForm.endDates = [2014, 2015, 2016];
		$scope.filterForm.selectedComms = ["11", "12", "13", "14"];
		$scope.filterForm.selectedTypes = ["ARSON", "ASSAULT", "BATTERY", "BURGLARY"];
	};

	$scope.map = MapSrvc.initMap();

	$scope.visibleData = [];
	google.maps.event.addListener($scope.map, 'bounds_changed', mapChange);

	$scope.minLat;
	$scope.maxLat;
	$scope.minLng;
	$scope.maxLng;

	$scope.filterForm = {};
	$scope.filterForm.communities = [];
	for(var prop in UtilSrvc.community) {
		$scope.filterForm.communities.push(UtilSrvc.community[prop]);
	}

	$scope.filterForm.communities = $scope.filterForm.communities.sort(function(a, b) {
		return a.Idx - b.Idx;
	});
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
		mapChange();
	};

	$scope.updateMap = function() {
		MapSrvc.removeMarkers();
		if($scope.filterForm.selectedComms.length == 0) {
			$scope.filterForm.selectedComms = undefined;
		}

		if($scope.filterForm.selectedTypes.length == 0) {
			$scope.filterForm.selectedTypes = undefined;
		}
		DataSrvc.getData($scope.filterForm.startingDate, $scope.filterForm.endingDate,
			$scope.filterForm.selectedComms, $scope.filterForm.selectedTypes).then(function(data) {
				$scope.highData = data.map(function(d) {
					return Crime.build(d);
				});
				MapSrvc.addMarkers($scope.highData);
			});
	};

	$scope.clearTopLevel = function() {
		reset();
		$scope.updateMap();
	};

	$scope.clearQuery = function() {
		$scope.queryForm.queryBy = "$";
		$scope.queryForm.query = {};
	};

	var openWindow;
	reset();
	DataSrvc.getData($scope.filterForm.startingDate, $scope.filterForm.endingDate,
		$scope.filterForm.selectedComms, $scope.filterForm.selectedTypes).then(function(data) {
			$scope.highData = data.map(function(d) {
				return Crime.build(d);
			});
			MapSrvc.addMarkers($scope.highData);
			mapChange();
		});
});
