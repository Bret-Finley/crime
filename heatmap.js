
angular.module('app')

.directive("crimeHeatmap", function(UtilSrvc) {
	return {
		restrict: 'E',
		templateUrl: 'heatmap.html',
		link: function($scope, element, attrs) {

			var themap;
			var maxScrollWidth;
			var maxScrollHeight;
			function scroll() {
				if(themap.scrollTop) {
					var top = -themap.scrollTop;
					svgTypes.attr("transform", "translate(0," + top + ")");
				} else {
					var left = -themap.scrollLeft;
					svgComms.attr("transform", "translate(" + left + ", 0)");
				}
			}

			function done() {
				themap = element.children()[1].children[1];
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
	        var colors = ["#2166ac", "#4393c3", "#92c5de", "#d1e5f0", "#f7f7f7", "#fddbc7", "#f4a582", "#d6604d", "#b2182b"]; // alternatively colorbrewer.YlGnBu[9]
	        var communities = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];
	        var types = ["ARSON", "ASSAULT", "BATTERY", "BURGLARY", "CRIM SEXUAL ASSAULT", "CRIMINAL DAMAGE", "CRIMINAL TRESPASS"];

	        var svgComms = d3.select("#comms").append("svg")
	        								  .attr("width", communities.length * gridSize)
	        								  .attr("height", 14)
	        								  .append("g");

	        var svgTypes = d3.select("#types").append("svg")
	        								  .attr("width", 80)
	        								  .attr("height", types.length * gridSize)
	        								  .append("g");

	        var svgLegend = d3.select("#legend").append("svg")
	        									.attr("width", communities.length * gridSize)
	        									.attr("height", 40)
	        									.append("g");

	        var commLabels = svgComms.selectAll(".commLabel")
            					.data(communities)
            					.enter().append("text")
            					.text(function(d) { return d; })
            					.attr("x", function(d, i) { return i * gridSize; })
            					.attr("y", 0)
            					.style("text-anchor", "middle")
            					.attr("transform", "translate(0," + 14 +")")
            					.attr("class", "mono");

            var typeLabels = svgTypes.selectAll(".typeLabel")
            					.data(types)
            					.enter()
            					.append("text")
            					.text(function (d) { return d; })
            					.attr("x", 0)
            					.attr("y", function (d, i) { return i * gridSize; })
            					.style("text-anchor", "end")
            					.attr("transform", "translate(60," + gridSize / 2 + ")")
            					.attr("class", "mono");

            var svg = d3.select("#heat").append("svg")
            							 //.attr("width", width + margin.left + margin.right)
            							 .attr("width", communities.length * gridSize)
            							 .attr("height", types.length * gridSize)
            							 .append("g")
            							 //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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