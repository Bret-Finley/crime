
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
		$scope.filterForm.endDates = [2010, 2011, 2012, 2013, 2014, 2015, 2016];
		$scope.filterForm.selectedComms = undefined;
		$scope.filterForm.selectedTypes = undefined;
	};

	$scope.map = MapSrvc.initMap();

	$scope.visibleData = [];
	google.maps.event.addListener($scope.map, 'dragend', mapChange);
	google.maps.event.addListener($scope.map, 'zoom_changed', mapChange);

	$scope.minLat;
	$scope.maxLat;
	$scope.minLng;
	$scope.maxLng;

	$scope.filterForm = {};
	$scope.filterForm.communities = [];
	var i = 1;
	for(var prop in UtilSrvc.community) {
		$scope.filterForm.communities.push({
			comm: UtilSrvc.community[prop].Name,
			ind: i
		});
		i++;
	}
	$scope.filterForm.communities = $scope.filterForm.communities.sort(function(a, b) {
		if(a.comm < b.comm) return -1;
		else return 1;
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
