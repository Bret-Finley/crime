
angular.module('app')

.directive("crimeHeatmap", function(UtilSrvc) {
	return {
		restrict: 'E',
		template: '<div id="chart"></div>',
		link: function($scope, element, attrs) {

			var themap;
			var maxScrollWidth;
			var maxScrollHeight;
			function scroll() {
				console.info(themap.scrollLeft / maxScrollWidth)
				//console.log(themap.scrollTop / maxScrollHeight);
			}

			function done() {
				themap = element[0].firstChild;
				themap.onscroll = scroll;
				maxScrollWidth = themap.scrollWidth - themap.clientWidth;
				maxScrollHeight = themap.scrollHeight - themap.clientHeight;
			}

			$scope.$watch(function() {
				return $scope.highData;
			}, function() {
				console.log("High Data is changing!")
				update();
			}, true);

		    var margin = { top: 50, right: 0, bottom: 100, left: 50 };
		    var width = 960 - margin.left - margin.right;
	        var height = 430 - margin.top - margin.bottom;
	        var gridSize = 40;
	        var legendElementWidth = 80;
	        var colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]; // alternatively colorbrewer.YlGnBu[9]
	        var communities = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];
	        var types = ["ARSON", "ASSAULT", "BATTERY", "BURGLARY", "CRIM SEXUAL ASSAULT", "CRIMINAL DAMAGE", "CRIMINAL TRESPASS"];

            var svg = d3.select("#chart").append("svg")
            							 .attr("width", width + margin.left + margin.right)
            							 .attr("height", height + margin.top + margin.bottom)
            							 .append("g")
            							 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var commLabels = svg.selectAll(".dayLabel")
            					.data(types)
            					.enter()
            					.append("text")
            					.text(function (d) { return d; })
            					.attr("x", 0)
            					.attr("y", function (d, i) { return i * gridSize; })
            					.style("text-anchor", "end")
            					.attr("transform", "translate(-6," + gridSize / 1.5 + ")")
            					.attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });

            var typeLabels = svg.selectAll(".timeLabel")
            					.data(communities)
            					.enter().append("text")
            					.text(function(d) { return d; })
            					.attr("x", function(d, i) { return i * gridSize; })
            					.attr("y", 0)
            					.style("text-anchor", "middle")
            					.attr("transform", "translate(" + gridSize / 2 + ", -6)")
            					.attr("class", function(d, i) { return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });

            function getCommFromIndex(i) {
            	return Math.floor(i / types.length);
            }

            function getTypeFromIndex(i) {
            	return i % types.length;
            }

            var cards;
            function update() {
	        	if(!$scope.highData) return;
	        	var min = 11;
	        	var raw = $scope.highData;
	        	var data = [];
	        	raw.forEach(function(d, i) {
	        		if(!communities.includes(d.Community.Code) || !types.includes(d.Type)) {
	        			// do nothing
	        		} else {
	        			var index = (d.Community.Code - min) * types.length + types.indexOf(d.Type);
	        			if(!data[index]) data[index] = 1;
	        			else data[index]++;
	        		}
	        	});
	        	
	        	var colorScale = d3.scale.quantile()
	        							 .domain([0, colors.length, d3.max(data, function (d) { return d; })])
	        							 .range(colors);

	        	cards = svg.selectAll(".hour")
	        			   .data(data);

	        	cards.append("title");
	        	cards.enter().append("rect")
	        		 		 .attr("x", function(d, i) { return getCommFromIndex(i) * gridSize; })
	        		 		 .attr("y", function(d, i) { return getTypeFromIndex(i) * gridSize; })
	        		 		 .attr("rx", 4)
	        		 		 .attr("ry", 4)
	        		 		 .attr("class", "hour bordered")
	        		 		 .attr("width", gridSize)
	        		 		 .attr("height", gridSize)
	        		 		 .style("fill", function(d) { var t = d || 0; return colorScale(t) });

	            cards.select("title").text(function(d) { return d.value; });
	            cards.exit().remove();

	            var legend = svg.selectAll(".legend")
	            				.data([0].concat(colorScale.quantiles()), function(d) { return d; });
	            legend.enter().append("g")
	            			  .attr("class", "legend");

	            legend.append("rect")
	            	  .attr("x", function(d, i) { return legendElementWidth * i; })
	            	  .attr("y", height)
	            	  .attr("width", legendElementWidth)
	            	  .attr("height", gridSize / 2)
	            	  .style("fill", function(d, i) { return colors[i]; });

	            legend.append("text")
	            	  .attr("class", "mono")
	            	  .text(function(d) { return "≥ " + Math.round(d); })
	            	  .attr("x", function(d, i) { return legendElementWidth * i; })
	            	  .attr("y", height + gridSize);
	            legend.exit().remove();
	            done();
			}
		}
	};
});