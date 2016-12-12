
angular.module('app')

.factory("UtilSrvc", function() {

	var community = {
	    "1": {
	        Name: "Rogers Park",
	        Code: 1,
	        Abbr: "Rgrs Prk",
	        Idx: 60
	    },
	    "2": {
	        Name: "West Ridge",
	        Code: 2,
	        Abbr: "W. Rdg",
	        Idx: 74
	    },
	    "3": {
	        Name: "Uptown",
	        Code: 3,
	        Abbr: "Uptwn",
	        Idx: 66
	    },
	    "4": {
	        Name: "Lincoln Square",
	        Code: 4,
	        Abbr: "Lncn Sqr",
	        Idx: 41
	    },
	    "5": {
	        Name: "North Center",
	        Code: 5,
	        Abbr: "N. Cntr",
	        Idx: 51
	    },
	    "6": {
	        Name: "Lake View",
	        Code: 6,
	        Abbr: "Lk Vu",
	        Idx: 39
	    },
	    "7": {
	        Name: "Lincoln Park",
	        Code: 7,
	        Abbr: "Lncn Prk",
	        Idx: 40
	    },
	    "8": {
	        Name: "Near North Side",
	        Code: 8,
	        Abbr: "Nr N. Sd",
	        Idx: 47
	    },
	    "9": {
	        Name: "Edison Park",
	        Code: 9,
	        Abbr: "Edsn Prk",
	        Idx: 22
	    },
	    "10": {
	        Name: "Norwood Park",
	        Code: 10,
	        Abbr: "Nrwd Prk",
	        Idx: 54
	    },
	    "11": {
	        Name: "Jefferson Park",
	        Code: 11,
	        Abbr: "Jfrsn Prk",
	        Idx: 35
	    },
	    "12": {
	        Name: "Forest Glen",
	        Code: 12,
	        Abbr: "Frst Gln",
	        Idx: 24
	    },
	    "13": {
	        Name: "North Park",
	        Code: 13,
	        Abbr: "N. Prk",
	        Idx: 53
	    },
	    "14": {
	        Name: "Albany Park",
	        Code: 14,
	        Abbr: "Alb Prk",
	        Idx: 0
	    },
	    "15": {
	        Name: "Portage Park",
	        Code: 15,
	        Abbr: "Prtg Prk",
	        Idx: 57
	    },
	    "16": {
	        Name: "Irving Park",
	        Code: 16,
	        Abbr: "Irv Prk",
	        Idx: 34
	    },
	    "17": {
	        Name: "Dunning",
	        Code: 17,
	        Abbr: "Dnng",
	        Idx: 18
	    },
	    "18": {
	        Name: "Monteclare",
	        Code: 18,
	        Abbr: "Mntclr",
	        Idx: 37
	    },
	    "19": {
	        Name: "Belmont Cragin",
	        Code: 19,
	        Abbr: "Blmnt Cgn",
	        Idx: 8
	    },
	    "20": {
	        Name: "Hermosa",
	        Code: 20,
	        Abbr: "Hrmsa",
	        Idx: 31
	    },
	    "21": {
	        Name: "Avondale",
	        Code: 21,
	        Abbr: "Avndl",
	        Idx: 7
	    },
	    "22": {
	        Name: "Logan Square",
	        Code: 22,
	        Abbr: "Lgn Sqr",
	        Idx: 36
	    },
	    "23": {
	        Name: "Humboldt Park",
	        Code: 23,
	        Abbr: "Hmblt Prk",
	        Idx: 32
	    },
	    "24": {
	        Name: "West Town",
	        Code: 24,
	        Abbr: "W. Twn",
	        Idx: 75
	    },
	    "25": {
	        Name: "Austin",
	        Code: 25,
	        Abbr: "Astn",
	        Idx: 5
	    },
	    "26": {
	        Name: "West Garfield Park",
	        Code: 26,
	        Abbr: "W. Grf Prk",
	        Idx: 71
	    },
	    "27": {
	        Name: "East Garfield Park",
	        Code: 27,
	        Abbr: "E. Grf Prk",
	        Idx: 19
	    },
	    "28": {
	        Name: "Near West Side",
	        Code: 28,
	        Abbr: "Nr W. Sd",
	        Idx: 49
	    },
	    "29": {
	        Name: "North Lawndale",
	        Code: 29,
	        Abbr: "N. Lwndl",
	        Idx: 52
	    },
	    "30": {
	        Name: "South Lawndale",
	        Code: 30,
	        Abbr: "S. Lwndl",
	        Idx: 64
	    },
	    "31": {
	        Name: "Lower West Side",
	        Code: 31,
	        Abbr: "Lwr W. Sd",
	        Idx: 43
	    },
	    "32": {
	        Name: "Loop",
	        Code: 32,
	        Abbr: "Lp",
	        Idx: 42
	    },
	    "33": {
	        Name: "Near South Side",
	        Code: 33,
	        Abbr: "Nr S. Sd",
	        Idx: 48
	    },
	    "34": {
	        Name: "Armour Square",
	        Code: 34,
	        Abbr: "Armr Sqr",
	        Idx: 2
	    },
	    "35": {
	        Name: "Douglas",
	        Code: 35,
	        Abbr: "Dgls",
	        Idx: 17
	    },
	    "36": {
	        Name: "Oakland",
	        Code: 36,
	        Abbr: "Oklnd",
	        Idx: 56
	    },
	    "37": {
	        Name: "Fuller Park",
	        Code: 37,
	        Abbr: "Fllr Prk",
	        Idx: 25
	    },
	    "38": {
	        Name: "Grand Boulevard",
	        Code: 38,
	        Abbr: "Grnd Blvd",
	        Idx: 28
	    },
	    "39": {
	        Name: "Kenwood",
	        Code: 39,
	        Abbr: "Knwd",
	        Idx: 38
	    },
	    "40": {
	        Name: "Washington Park",
	        Code: 40,
	        Abbr: "Wsh Prk",
	        Idx: 68
	    },
	    "41": {
	        Name: "Hyde Park",
	        Code: 41,
	        Abbr: "Hde Prk",
	        Idx: 33
	    },
	    "42": {
	        Name: "Woodlawn",
	        Code: 42,
	        Abbr: "Wdlwn",
	        Idx: 76
	    },
	    "43": {
	        Name: "South Shore",
	        Code: 43,
	        Abbr: "S. Shr",
	        Idx: 65
	    },
	    "44": {
	        Name: "Chatham",
	        Code: 44,
	        Abbr: "Chthm",
	        Idx: 14
	    },
	    "45": {
	        Name: "Avalon Park",
	        Code: 45,
	        Abbr: "Avln Prk",
	        Idx: 6
	    },
	    "46": {
	        Name: "South Chicago",
	        Code: 46,
	        Abbr: "S. Chic",
	        Idx: 62
	    },
	    "47": {
	        Name: "Burnside",
	        Code: 47,
	        Abbr: "Brnsd",
	        Idx: 12
	    },
	    "48": {
	        Name: "Calumet Heights",
	        Code: 48,
	        Abbr: "Clmt Hghts",
	        Idx: 13
	    },
	    "49": {
	        Name: "Roseland",
	        Code: 49,
	        Abbr: "Rslnd",
	        Idx: 61
	    },
	    "50": {
	        Name: "Pullman",
	        Code: 50,
	        Abbr: "Pllmn",
	        Idx: 58
	    },
	    "51": {
	        Name: "South Deering",
	        Code: 51,
	        Abbr: "S. Drng",
	        Idx: 63
	    },
	    "52": {
	        Name: "East Side",
	        Code: 52,
	        Abbr: "E. Sd",
	        Idx: 20
	    },
	    "53": {
	        Name: "West Pullman",
	        Code: 53,
	        Abbr: "W. Pllmn",
	        Idx: 73
	    },
	    "54": {
	        Name: "Riverdale",
	        Code: 54,
	        Abbr: "Rvrdl",
	        Idx: 59
	    },
	    "55": {
	        Name: "Hegewisch",
	        Code: 55,
	        Abbr: "Hgwsch",
	        Idx: 30
	    },
	    "56": {
	        Name: "Garfield Ridge",
	        Code: 56,
	        Abbr: "Grf Rdg",
	        Idx: 27
	    },
	    "57": {
	        Name: "Archer Heights",
	        Code: 57,
	        Abbr: "Achr Hghts",
	        Idx: 1
	    },
	    "58": {
	        Name: "Brighton Park",
	        Code: 58,
	        Abbr: "Brtn Prk",
	        Idx: 11
	    },
	    "59": {
	        Name: "Mckinley Park",
	        Code: 59,
	        Abbr: "Mckin Prk",
	        Idx: 44
	    },
	    "60": {
	        Name: "Bridgeport",
	        Code: 60,
	        Abbr: "Brdgprt",
	        Idx: 10
	    },
	    "61": {
	        Name: "New City",
	        Code: 61,
	        Abbr: "Nw Cty",
	        Idx: 50
	    },
	    "62": {
	        Name: "West Elsdon",
	        Code: 62,
	        Abbr: "W. Elsdn",
	        Idx: 69
	    },
	    "63": {
	        Name: "Gage Park",
	        Code: 63,
	        Abbr: "Gg Prk",
	        Idx: 26
	    },
	    "64": {
	        Name: "Clearing",
	        Code: 64,
	        Abbr: "Clrng",
	        Idx: 16
	    },
	    "65": {
	        Name: "West Lawn",
	        Code: 65,
	        Abbr: "W. Lwn",
	        Idx: 72
	    },
	    "66": {
	        Name: "Chicago Lawn",
	        Code: 66,
	        Abbr: "Chic Lwn",
	        Idx: 15
	    },
	    "67": {
	        Name: "West Englewood",
	        Code: 67,
	        Abbr: "W. Englwd",
	        Idx: 70
	    },
	    "68": {
	        Name: "Englewood",
	        Code: 68,
	        Abbr: "Englwd",
	        Idx: 23
	    },
	    "69": {
	        Name: "Greater Grand Crossing",
	        Code: 69,
	        Abbr: "Gt Gd Crss",
	        Idx: 29
	    },
	    "70": {
	        Name: "Ashburn",
	        Code: 70,
	        Abbr: "Ashbrn",
	        Idx: 3
	    },
	    "71": {
	        Name: "Auburn Gresham",
	        Code: 71,
	        Abbr: "Abrn Gshm",
	        Idx: 4
	    },
	    "72": {
	        Name: "Beverly",
	        Code: 72,
	        Abbr: "Bvrly",
	        Idx: 9
	    },
	    "73": {
	        Name: "Washington Heights",
	        Code: 73,
	        Abbr: "Wsh Hghts",
	        Idx: 67
	    },
	    "74": {
	        Name: "Mount Greenwood",
	        Code: 74,
	        Abbr: "Mt. Grnwd",
	        Idx: 46
	    },
	    "75": {
	        Name: "Morgan Park",
	        Code: 75,
	        Abbr: "Mrgn Prk",
	        Idx: 45
	    },
	    "76": {
	        Name: "O Hare",
	        Code: 76,
	        Abbr: "O Hr",
	        Idx: 55
	    },
	    "77": {
	        Name: "Edgewater",
	        Code: 77,
	        Abbr: "Edgwtr",
	        Idx: 21
	    }
	};

	var dates = [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
		2011, 2012, 2013, 2014, 2015, 2016];

	var types = ["ARSON", "ASSAULT", "BATTERY", "BURGLARY", "CONCEALED CARRY LICENSE VIOLATION",
		"CRIM SEXUAL ASSAULT", "CRIMINAL ABORTION", "CRIMINAL DAMAGE", "CRIMINAL TRESPASS",
		"DECEPTIVE PRACTICE", "GAMBLING", "HOMICIDE", "HUMAN TRAFFICKING", "INTERFERENCE WITH PUBLIC OFFICER",
		"INTIMIDATION", "KIDNAPPING", "LIQUOR LAW VIOLATION", "MOTOR VEHICLE THEFT",
		"NARCOTICS", "NON-CRIMINAL", "OBSCENITY", "OFFENSE INVOLVING CHILDREN",
		"OTHER NARCOTIC VIOLATION", "OTHER OFFENSE", "PROSTITUTION", "PUBLIC PEACE VIOLATION",
		"PUBLIC INDECENCY", "RITUALISM", "ROBBERY", "SEX OFFENSE", "STALKING",
		"THEFT", "WEAPONS VIOLATION"];

	var typeAbbrs = ["ARSN", "ASLT", "BTTRY", "BRGLRY", "CCLVIO",
		"CSXASLT", "CABORT", "CDMG", "CTRSPS", 
		"DCPTV", "GMBLNG", "HMIC", "HMNTRFK", "INTR",
		"INTIM", "KDNP", "LQRVIO", "MVTFT",
		"NARCO", "NON-C", "OBSCNTY", "OFFCHLD",
		"ONARCO", "OTHR", "PRST", "PEACE",
		"INDCNT", "RITUAL", "RBBRY", "SXOFF", "STLK",
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
		typeAbbrs: typeAbbrs,
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
