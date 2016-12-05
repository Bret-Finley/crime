angular.module('app')

.directive("crimeBargraph", function(UtilSrvc) {
	return {
		restrict: 'E',
		templateUrl: 'barchart.html',
		link: function($scope, element, attrs) {

			$scope.$watch(function() {
				return $scope.highData;
			}, function() {
				update();
			}, true);

			$scope.selectedCrime = "";
			$scope.mycrimes = [];
			$scope.updateChart = function() {
				console.log($scope.selectedCrime);
			};

			var margin = { top: 20, right: 0, bottom: 100, left: 0 };
	        var height = 500;
	        var rectWidth = 20;
	        var xAxisFudge = 80;
	        var yAxisFudge = 80;
	        var svg = d3.select("#graph").append("svg");
            var svgGroup = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            function findCommunity(i) {
            	return _.find(UtilSrvc.community, function(d) {
            		return d.Idx === i;
            	});
            }

            var communities;
			function update() {
				if(!$scope.highData) return;
				$scope.mycrimes = $scope.filterForm.selectedTypes ? $scope.filterForm.selectedTypes : UtilSrvc.types;
				var myCommunities = $scope.filterForm.selectedComms ? $scope.filterForm.selectedComms : d3.range(1, 78);
				communities = myCommunities.map(function(d) {
	        		return UtilSrvc.community[d];
	        	});
	        	communities = communities.sort(function(a, b) {
	        		return a.Idx - b.Idx;
	        	});
				$scope.selectedCrime = $scope.mycrimes[0];

				var raw = $scope.highData;
				var min = d3.min(communities, function(d) {
	        		return d.Idx;
	        	});
	        	var data = [];
	        	raw.forEach(function(d, i) {
        			var index = d.Community.Idx - min;
        			if(d.Type === $scope.selectedCrime) {
        				if(!data[index]) data[index] = 1;
        				else data[index]++;
        			}
	        	});

	        	for(var i = 0; i < data.length; i++) {
	        		data[i] = data[i] || 0;
	        	}

	        	svg.attr("width", data.length * rectWidth)
	        	   .attr("height", height);
				
				var x = d3.scale.linear()
						  .domain([0, data.length])
						  .range([yAxisFudge, data.length * rectWidth]);
				var y = d3.scale.linear()
								.domain([0, d3.max(data)])
								.range([height - xAxisFudge, 0]);

				var xAxis = d3.svg.axis()
								  .scale(x)
								  .tickFormat(function(d) { return findCommunity(d).Abbr; })
								  .orient("bottom");
				var yAxis = d3.svg.axis()
								  .scale(y)
								  .orient("left");

				var xAxisPlacement = height - xAxisFudge;

				svgGroup.selectAll("rect")
				        .data(data)
				        .enter()
				        .append("rect")
				        .attr("x", function(d, i) { return x(i); })
				        .attr("y", function(d, i) { return y(d); })
				        .attr("width", 20)
				        .attr("height", function(d) { return xAxisPlacement - y(d); });

				svgGroup.append("g")
						.attr("transform", "translate(0," + xAxisPlacement + ")")
						.call(xAxis)
						.selectAll("text")
						.style("text-anchor", "start")
						.attr("transform", "rotate(45,0,9)");
				svgGroup.append("g")
						.attr("transform", "translate(" + yAxisFudge + ",0)")
						.call(yAxis);
			}
		}
	}
})