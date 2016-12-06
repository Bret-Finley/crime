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
				update();
			};

			var margin = { top: 10, right: 0, bottom: 100, left: 0 };
	        var height = 500;
	        var rectWidth = 20;
	        var xAxisFudge = 80;
	        var yAxisFudge = 40;
	        var svg = d3.select("#graph").append("svg");
            var svgGroup = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var div = d3.select("body").append("div")
									  .attr("class", "bartip")
									  .style("opacity", 0);

            function findCommunity(i) {
            	return _.find(UtilSrvc.community, function(d) {
            		return d.Idx === i;
            	});
            }

            function getIndexFromComm(c) {
            	return _.findIndex(communities, function(o) {
            		return o.Code === c.Community.Code;
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
				$scope.selectedCrime = $scope.selectedCrime || $scope.mycrimes[0];

				var raw = $scope.highData;
				var min = d3.min(communities, function(d) {
	        		return d.Idx;
	        	});
	        	var data = [];
	        	raw.forEach(function(d, i) {
        			var index = getIndexFromComm(d);
        			if(d.Type === $scope.selectedCrime) {
        				if(!data[index]) data[index] = 1;
        				else data[index]++;
        			}
	        	});

	        	for(var i = 0; i < data.length; i++) {
	        		data[i] = data[i] || 0;
	        	}

	        	var indicies = [];
	        	for(var i = 0; i < communities.length; i++) {
	        		indicies.push(communities[i].Idx);
	        	}

	        	svg.attr("width", data.length * rectWidth + 10)
	        	   .attr("height", height);
				
				var x = d3.scale.ordinal()
						  		.domain(indicies)
						  		.rangeBands([yAxisFudge, rectWidth * data.length]);
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

				svgGroup.selectAll("*").remove();

				svgGroup.selectAll("rect")
				        .data(data)
				        .enter()
				        .append("rect")
				        .attr("class", "bar")
				        .attr("x", function(d, i) { return x(i); })
				        .attr("y", function(d, i) { return y(d); })
				        .attr("width", rectWidth)
				        .attr("height", function(d) { return xAxisPlacement - y(d); })
				        .on("mouseover", function(d, i) {
	        		 		var divComm = findCommunity(i).Name;
	        		 		div.transition()
	        		 		   .duration(200)
	        		 		   .style("opacity", .9);
	        		 		div.html("Location: " + divComm + "<br /> Freq: " + d)
	        		 		   .style("left", (d3.event.pageX) + "px")
	        		 		   .style("top", (d3.event.pageY - 28) + "px");
	        		 		})
	        		 		.on("mouseout", function(d) {
	        		 		 	div.transition()
	        		 		 	   .duration(500)
	        		 		 	   .style("opacity", 0);
	        		 		});

				svgGroup.append("g")
						.attr("transform", "translate(0," + xAxisPlacement + ")")
						.call(xAxis)
						.selectAll("text")
						.style("text-anchor", "start")
						.attr("transform", "translate(" + rectWidth/4 + ",0)rotate(65,0,9)");
				svgGroup.append("g")
						.attr("transform", "translate(" + yAxisFudge + ",0)")
						.call(yAxis);
			}
		}
	}
})