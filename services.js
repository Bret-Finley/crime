
angular.module('app')

.factory("Srvc", function($q, $http, Crime) {

	function row(d) {
		return Crime.build(d);
	};

	function getData() {
		var deferred = $q.defer();

		d3.csv("data/test.csv", row, function(data) {
			deferred.resolve(data);
		});

		return deferred.promise;
	}

	function filterData(filter) {
		var deferred = $q.defer();
		d3.csv("data/test.csv", row, function(data) {
			var filteredData = data.filter(function(d) {
				return d.Date.getFullYear() == 2014;
			});
			deferred.resolve(data);
		});

		return deferred.promise;
	}

	return {
		getData: getData,
		filterData: filterData
	};
})

.factory("Crime", function() {
	var Crime = function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
		this.Arrest = a;
		this.Beat = b;
		this.Block = c;
		this.CaseNumber = d;
		this.Community = e;
		this.Date = f;
		this.Desc = g;
		this.District = h;
		this.Domestic = i;
		this.ID = j;
		this.Latitude = k;
		this.Longitude = l;
		this.Location = m;
		this.Type = n;
		this.Ward = o;
	};

	Crime.build = function(d) {
		return new Crime(
				d.Arrest === "true",
				parseInt(d.Beat, 10),
				d.Block,
				d["Case Number"],
				parseInt(d["Community Area"], 10),
				new Date(d.Date),
				d.Description,
				d.District,
				d.Domestic === "true",
				parseInt(d.ID, 10),
				parseFloat(d.Latitude, 10),
				parseFloat(d.Longitude, 10),
				d["Location Description"],
				d["Primary Type"],
				parseInt(d.Ward, 10)
			);
	};

	return Crime;
})

.factory("Util", function() {

	var toArray = function(obj) {
		var array = [];
		for(var prop in obj) {
			array.push(prop);
		}

		return array.sort();
	};

	return {
		toArray: toArray
	};
});
