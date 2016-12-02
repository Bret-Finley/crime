
angular.module('app')

.factory("UtilSrvc", function() {

	var community = {
	    "1": {
	        Name: "Rogers Park",
	        Code: 1,
	        Abbr: "Rgrs Prk"
	    },
	    "2": {
	        Name: "West Ridge",
	        Code: 2,
	        Abbr: "W. Rdg"
	    },
	    "3": {
	        Name: "Uptown",
	        Code: 3,
	        Abbr: "Uptwn"
	    },
	    "4": {
	        Name: "Lincoln Square",
	        Code: 4,
	        Abbr: "Lncn Sqr"
	    },
	    "5": {
	        Name: "North Center",
	        Code: 5,
	        Abbr: "N. Cntr"
	    },
	    "6": {
	        Name: "Lake View",
	        Code: 6,
	        Abbr: "Lk Vu"
	    },
	    "7": {
	        Name: "Lincoln Park",
	        Code: 7,
	        Abbr: "Lncn Prk"
	    },
	    "8": {
	        Name: "Near North Side",
	        Code: 8,
	        Abbr: "Nr N. Sd"
	    },
	    "9": {
	        Name: "Edison Park",
	        Code: 9,
	        Abbr: "Edsn Prk"
	    },
	    "10": {
	        Name: "Norwood Park",
	        Code: 10,
	        Abbr: "Nrwd Prk"
	    },
	    "11": {
	        Name: "Jefferson Park",
	        Code: 11,
	        Abbr: "Jfrsn Prk"
	    },
	    "12": {
	        Name: "Forest Glen",
	        Code: 12,
	        Abbr: "Frst Gln"
	    },
	    "13": {
	        Name: "North Park",
	        Code: 13,
	        Abbr: "N. Prk"
	    },
	    "14": {
	        Name: "Albany Park",
	        Code: 14,
	        Abbr: "Alb Prk"
	    },
	    "15": {
	        Name: "Portage Park",
	        Code: 15,
	        Abbr: "Prtg Prk"
	    },
	    "16": {
	        Name: "Irving Park",
	        Code: 16,
	        Abbr: "Irv Prk"
	    },
	    "17": {
	        Name: "Dunning",
	        Code: 17,
	        Abbr: "Dnng"
	    },
	    "18": {
	        Name: "Monteclare",
	        Code: 18,
	        Abbr: "Mntclr"
	    },
	    "19": {
	        Name: "Belmont Cragin",
	        Code: 19,
	        Abbr: "Blmnt Cgn"
	    },
	    "20": {
	        Name: "Hermosa",
	        Code: 20,
	        Abbr: "Hrmsa"
	    },
	    "21": {
	        Name: "Avondale",
	        Code: 21,
	        Abbr: "Avndl"
	    },
	    "22": {
	        Name: "Logan Square",
	        Code: 22,
	        Abbr: "Lgn Sq"
	    },
	    "23": {
	        Name: "Humboldt Park",
	        Code: 23,
	        Abbr: "Hmblt Prk"
	    },
	    "24": {
	        Name: "West Town",
	        Code: 24,
	        Abbr: "W. Twn"
	    },
	    "25": {
	        Name: "Austin",
	        Code: 25,
	        Abbr: "Astn"
	    },
	    "26": {
	        Name: "West Garfield Park",
	        Code: 26,
	        Abbr: "W. Grf Prk"
	    },
	    "27": {
	        Name: "East Garfield Park",
	        Code: 27,
	        Abbr: "E. Grf Prk"
	    },
	    "28": {
	        Name: "Near West Side",
	        Code: 28,
	        Abbr: "Nr W. Sd"
	    },
	    "29": {
	        Name: "North Lawndale",
	        Code: 29,
	        Abbr: "N. Lwndl"
	    },
	    "30": {
	        Name: "South Lawndale",
	        Code: 30,
	        Abbr: "S. Lwndl"
	    },
	    "31": {
	        Name: "Lower West Side",
	        Code: 31,
	        Abbr: "Lwr W. Sd"
	    },
	    "32": {
	        Name: "Loop",
	        Code: 32,
	        Abbr: "Lp"
	    },
	    "33": {
	        Name: "Near South Side",
	        Code: 33,
	        Abbr: "Nr S. Sd"
	    },
	    "34": {
	        Name: "Armour Square",
	        Code: 34,
	        Abbr: "Armr Sq"
	    },
	    "35": {
	        Name: "Douglas",
	        Code: 35,
	        Abbr: "Dgls"
	    },
	    "36": {
	        Name: "Oakland",
	        Code: 36,
	        Abbr: "Oklnd"
	    },
	    "37": {
	        Name: "Fuller Park",
	        Code: 37,
	        Abbr: "Fllr Prk"
	    },
	    "38": {
	        Name: "Grand Boulevard",
	        Code: 38,
	        Abbr: "Grnd Blvd"
	    },
	    "39": {
	        Name: "Kenwood",
	        Code: 39,
	        Abbr: "Knwd"
	    },
	    "40": {
	        Name: "Washington Park",
	        Code: 40,
	        Abbr: "Wsh Prk"
	    },
	    "41": {
	        Name: "Hyde Park",
	        Code: 41,
	        Abbr: "Hde Prk"
	    },
	    "42": {
	        Name: "Woodlawn",
	        Code: 42,
	        Abbr: "Wdlwn"
	    },
	    "43": {
	        Name: "South Shore",
	        Code: 43,
	        Abbr: "S. Shr"
	    },
	    "44": {
	        Name: "Chatham",
	        Code: 44,
	        Abbr: "Chthm"
	    },
	    "45": {
	        Name: "Avalon Park",
	        Code: 45,
	        Abbr: "Avln Prk"
	    },
	    "46": {
	        Name: "South Chicago",
	        Code: 46,
	        Abbr: "S. Chic"
	    },
	    "47": {
	        Name: "Burnside",
	        Code: 47,
	        Abbr: "Brnsd"
	    },
	    "48": {
	        Name: "Calumet Heights",
	        Code: 48,
	        Abbr: "Clmt Hghts"
	    },
	    "49": {
	        Name: "Roseland",
	        Code: 49,
	        Abbr: "Rslnd"
	    },
	    "50": {
	        Name: "Pullman",
	        Code: 50,
	        Abbr: "Pllmn"
	    },
	    "51": {
	        Name: "South Deering",
	        Code: 51,
	        Abbr: "S. Drng"
	    },
	    "52": {
	        Name: "East Side",
	        Code: 52,
	        Abbr: "E. Sd"
	    },
	    "53": {
	        Name: "West Pullman",
	        Code: 53,
	        Abbr: "W. Pllmn"
	    },
	    "54": {
	        Name: "Riverdale",
	        Code: 54,
	        Abbr: "Rvrdl"
	    },
	    "55": {
	        Name: "Hegewisch",
	        Code: 55,
	        Abbr: "Hgwsch"
	    },
	    "56": {
	        Name: "Garfield Ridge",
	        Code: 56,
	        Abbr: "Grf Rdg"
	    },
	    "57": {
	        Name: "Archer Heights",
	        Code: 57,
	        Abbr: "Archr Hghts"
	    },
	    "58": {
	        Name: "Brighton Park",
	        Code: 58,
	        Abbr: "Brtn Prk"
	    },
	    "59": {
	        Name: "Mckinley Park",
	        Code: 59,
	        Abbr: "Mckin Prk"
	    },
	    "60": {
	        Name: "Bridgeport",
	        Code: 60,
	        Abbr: "Brdgprt"
	    },
	    "61": {
	        Name: "New City",
	        Code: 61,
	        Abbr: "Nw Cty"
	    },
	    "62": {
	        Name: "West Elsdon",
	        Code: 62,
	        Abbr: "W. Elsdn"
	    },
	    "63": {
	        Name: "Gage Park",
	        Code: 63,
	        Abbr: "Gg Prk"
	    },
	    "64": {
	        Name: "Clearing",
	        Code: 64,
	        Abbr: "Clrng"
	    },
	    "65": {
	        Name: "West Lawn",
	        Code: 65,
	        Abbr: "W. Lwn"
	    },
	    "66": {
	        Name: "Chicago Lawn",
	        Code: 66,
	        Abbr: "Chic Lwn"
	    },
	    "67": {
	        Name: "West Englewood",
	        Code: 67,
	        Abbr: "W. Englwd"
	    },
	    "68": {
	        Name: "Englewood",
	        Code: 68,
	        Abbr: "Englwd"
	    },
	    "69": {
	        Name: "Greater Grand Crossing",
	        Code: 69,
	        Abbr: "Gt Gd Crss"
	    },
	    "70": {
	        Name: "Ashburn",
	        Code: 70,
	        Abbr: "Ashbrn"
	    },
	    "71": {
	        Name: "Auburn Gresham",
	        Code: 71,
	        Abbr: "Abrn Gshm"
	    },
	    "72": {
	        Name: "Beverly",
	        Code: 72,
	        Abbr: "Bvrly"
	    },
	    "73": {
	        Name: "Washington Heights",
	        Code: 73,
	        Abbr: "Wsh Hghts"
	    },
	    "74": {
	        Name: "Mount Greenwood",
	        Code: 74,
	        Abbr: "Mt. Grnwd"
	    },
	    "75": {
	        Name: "Morgan Park",
	        Code: 75,
	        Abbr: "Mrgn Prk"
	    },
	    "76": {
	        Name: "O Hare",
	        Code: 76,
	        Abbr: "O Hr"
	    },
	    "77": {
	        Name: "Edgewater",
	        Code: 77,
	        Abbr: "Edgwtr"
	    }
	};

	var dates = [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
		2011, 2012, 2013, 2014, 2015, 2016];

	var types = ["ARSON", "ASSAULT", "BATTERY", "BURGLARY", "CRIM SEXUAL ASSAULT",
		"CRIMINAL DAMAGE", "CRIMINAL TRESPASS", "DECEPTIVE PRACTICE", "INTERFERENCE WITH PUBLIC OFFICER",
		"INTIMIDATION", "KIDNAPPING", "LIQUOR LAW VIOLATION", "MOTOR VEHICLE THEFT",
		"NARCOTICS", "OBSCENITY", "OFFENSE INVOLVING CHILDREN", "OTHER NARCOTIC VIOLATION",
		"OTHER OFFENSE", "PROSTITUTION", "PUBLIC PEACE VIOLATION", "ROBBERY", "SEX OFFENSE",
		"STALKING", "THEFT", "WEAPONS VIOLATION"];

	var typeAbbrs = ["ARSN", "ASLT", "BTTRY", "BRGLRY", "CSXASLT", "CDMG", "CTRSPS", 
		"DCPTV", "INTR", "INTIM", "KDNP", "LQRVIO", "MVTFT", "NARCO", "OBSCNTY", 
		"OFFCHLD", "ONARCO", "OTHR", "PRST", "PEACE", "RBBRY", "SXOFF", "STLK",
		"THFT", "WPNVIO"];

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
		dates: dates,
		types: types,
		community: community,
		formatDate: formatDate
	};
})

.factory("Crime", function(UtilSrvc) {
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
				UtilSrvc.community[d["Community Area"]],
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

.factory("DataSrvc", function($q, $http, Crime) {

	function row(d) {
		return Crime.build(d);
	};

	function getData(begin, end, comms, types) {
		begin = begin || 2001;
		end = end || 2016;
		comms = comms || ["all"];
		types = types || ["all"];

		comms = comms.join(',');
		types = types.join(',');

		return $http.get('http://localhost:3000/data?' +
			'begin=' + begin + "&end=" + end + '&comms=' + comms + '&types=' + types)
			.then(function(res) {
				console.log(res)
				return res.data;
		}, function(error) {
			console.error(error);
			return $q.reject(error);
		});
	};

	return {
		getData: getData
	};
})

.factory("MapSrvc", function(UtilSrvc) {

	var map;
	var openWindow;
	var clusterer;
	var markers = [];

	function initMap() {
		if(map) {
			return map;
		}

		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 41.754592961, lng: -87.741528537},
			zoom: 8,
		});

		return map;
	};

	function goTo(lat, lng) {
		var loc = new google.maps.LatLng(lat, lng);
		map.setZoom(20);
		map.panTo(loc);
	}

	function addMarkers(data) {
		markers = [];
		data.forEach(function(d, i) {
			var iw = new google.maps.InfoWindow({
				content: "<span class='iwtype'>" + d.Type + "</span><span class='iwdate'>" + UtilSrvc.formatDate(d.Date) + "</span>" +
					"<hr class='iwhr' />" +
					"<span class='iwcomm'>" + d.Community.Name + "</span>, <span class='iwcomm'>" + d.Location + "</span><br />" +
					d.Block + "<br />" +
					d.Desc + "<br />"
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
				iw.open(map, marker);
			});
			markers.push(marker);
		});

		clusterer =  new MarkerClusterer(map, markers, {imagePath: 'images/m'});
	}

	function removeMarkers() {
		clusterer.clearMarkers();
	}

	function highlightMarkers(markers) {

	}


	return {
		initMap: initMap,
		goTo: goTo,
		addMarkers: addMarkers,
		removeMarkers: removeMarkers,
		markers: markers
	};
});
