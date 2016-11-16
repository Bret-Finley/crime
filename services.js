
angular.module('app')

.factory("Util", function() {

	var community = {
	    "1": {
	        Name: "Rogers Park"
	    },
	    "2": {
	        Name: "West Ridge"
	    },
	    "3": {
	        Name: "Uptown"
	    },
	    "4": {
	        Name: "Lincoln Square"
	    },
	    "5": {
	        Name: "North Center"
	    },
	    "6": {
	        Name: "Lake View"
	    },
	    "7": {
	        Name: "Lincoln Park"
	    },
	    "8": {
	        Name: "Near North Side"
	    },
	    "9": {
	        Name: "Edison Park"
	    },
	    "10": {
	        Name: "Norwood Park"
	    },
	    "11": {
	        Name: "Jefferson Park"
	    },
	    "12": {
	        Name: "Forest Glen"
	    },
	    "13": {
	        Name: "North Park"
	    },
	    "14": {
	        Name: "Albany Park"
	    },
	    "15": {
	        Name: "Portage Park"
	    },
	    "16": {
	        Name: "Irving Park"
	    },
	    "17": {
	        Name: "Dunning"
	    },
	    "18": {
	        Name: "Monteclare"
	    },
	    "19": {
	        Name: "Belmont Cragin"
	    },
	    "20": {
	        Name: "Hermosa"
	    },
	    "21": {
	        Name: "Avondale"
	    },
	    "22": {
	        Name: "Logan Square"
	    },
	    "23": {
	        Name: "Humboldt Park"
	    },
	    "24": {
	        Name: "West Town"
	    },
	    "25": {
	        Name: "Austin"
	    },
	    "26": {
	        Name: "West Garfield Park"
	    },
	    "27": {
	        Name: "East Garfield Park"
	    },
	    "28": {
	        Name: "Near West Side"
	    },
	    "29": {
	        Name: "North Lawndale"
	    },
	    "30": {
	        Name: "South Lawndale"
	    },
	    "31": {
	        Name: "Lower West Side"
	    },
	    "32": {
	        Name: "Loop"
	    },
	    "33": {
	        Name: "Near South Side"
	    },
	    "34": {
	        Name: "Armour Square"
	    },
	    "35": {
	        Name: "Douglas"
	    },
	    "36": {
	        Name: "Oakland"
	    },
	    "37": {
	        Name: "Fuller Park"
	    },
	    "38": {
	        Name: "Grand Boulevard"
	    },
	    "39": {
	        Name: "Kenwood"
	    },
	    "40": {
	        Name: "Washington Park"
	    },
	    "41": {
	        Name: "Hyde Park"
	    },
	    "42": {
	        Name: "Woodlawn"
	    },
	    "43": {
	        Name: "South Shore"
	    },
	    "44": {
	        Name: "Chatham"
	    },
	    "45": {
	        Name: "Avalon Park"
	    },
	    "46": {
	        Name: "South Chicago"
	    },
	    "47": {
	        Name: "Burnside"
	    },
	    "48": {
	        Name: "Calumet Heights"
	    },
	    "49": {
	        Name: "Roseland"
	    },
	    "50": {
	        Name: "Pullman"
	    },
	    "51": {
	        Name: "South Deering"
	    },
	    "52": {
	        Name: "East Side"
	    },
	    "53": {
	        Name: "West Pullman"
	    },
	    "54": {
	        Name: "Riverdale"
	    },
	    "55": {
	        Name: "Hegewisch"
	    },
	    "56": {
	        Name: "Garfield Ridge"
	    },
	    "57": {
	        Name: "Archer Heights"
	    },
	    "58": {
	        Name: "Brighton Park"
	    },
	    "59": {
	        Name: "Mckinley Park"
	    },
	    "60": {
	        Name: "Bridgeport"
	    },
	    "61": {
	        Name: "New City"
	    },
	    "62": {
	        Name: "West Elsdon"
	    },
	    "63": {
	        Name: "Gage Park"
	    },
	    "64": {
	        Name: "Clearing"
	    },
	    "65": {
	        Name: "West Lawn"
	    },
	    "66": {
	        Name: "Chicago Lawn"
	    },
	    "67": {
	        Name: "West Englewood"
	    },
	    "68": {
	        Name: "Englewood"
	    },
	    "69": {
	        Name: "Greater Grand Crossing"
	    },
	    "70": {
	        Name: "Ashburn"
	    },
	    "71": {
	        Name: "Auburn Gresham"
	    },
	    "72": {
	        Name: "Beverly"
	    },
	    "73": {
	        Name: "Washington Heights"
	    },
	    "74": {
	        Name: "Mount Greenwood"
	    },
	    "75": {
	        Name: "Morgan Park"
	    },
	    "76": {
	        Name: "O Hare"
	    },
	    "77": {
	        Name: "Edgewater"
	    }
	};

	var formatDate = function(date) {
		return dateFormat(date, "mm/dd/yy hh:MMTT");
	};

	var toArray = function(obj) {
		var array = [];
		for(var prop in obj) {
			array.push(prop);
		}

		return array.sort();
	};

	return {
		toArray: toArray,
		community: community,
		formatDate: formatDate
	};
})

.factory("Crime", function(Util) {
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
				Util.community[d["Community Area"]].Name,
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
});
