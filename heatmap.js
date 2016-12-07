
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
				var top = -themap.scrollTop || 0;
				var left = -themap.scrollLeft || 0;
				typeGroup.attr("transform", "translate(0," + top + ")");
				commGroup.attr("transform", "translate(" + left + ", 0)");
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
				update();
			}, true);

		    var margin = { top: 50, right: 0, bottom: 100, left: 50 };
		    var width = 960 - margin.left - margin.right;
	        var height = 430 - margin.top - margin.bottom;
	        var gridSize = 50;
	        var legendElementWidth = 80;
	        var colors = ["#d1e5f0", "#92c5de", "#4393c3", "#3781ae", "#f7f7f7", "#fddbc7", "#f4a582", "#d6604d", "#b2182b"];

	        var svgLegend = d3.select("#legend").append("svg")
	        									.attr("width", 700)
	        									.attr("height", 100)
	        									.append("g");

	        var svgComms = d3.select("#comms").append("svg");
	        var commGroup = svgComms.append("g");

	        var svgTypes = d3.select("#types").append("svg");
	        var typeGroup = svgTypes.append("g");

	        var svg = d3.select("#heat").append("svg");
	        var svgGroup = svg.append("g");

	        var div = d3.select("body").append("div")
									  .attr("class", "heattip")
									  .style("opacity", 0);

            function getCommFromIndex(i) {
            	return Math.floor(i / types.length);
            }

            function getIndexFromComm(c) {
            	return _.findIndex(communities, function(o) {
            		return o.Code === c.Community.Code;
            	});
            }

            function getTypeFromIndex(i) {
            	return i % types.length;
            }

            function getAbbreviation(t) {
            	return UtilSrvc.typeAbbrs[UtilSrvc.types.indexOf(t)];
            }

            var cards;
            var commLabels;
            var typeLabels;
            var communities;
            var types;
            function update() {
	        	if(!$scope.highData) return;
	        	var myCommunities = $scope.filterForm.selectedComms ? $scope.filterForm.selectedComms : d3.range(1, 78);
	        	types = $scope.filterForm.selectedTypes ? $scope.filterForm.selectedTypes : UtilSrvc.types;
	        	communities = myCommunities.map(function(d) {
	        		return UtilSrvc.community[d];
	        	});
	        	communities = communities.sort(function(a, b) {
	        		return a.Idx - b.Idx;
	        	});
	        	var min = d3.min(communities, function(d) {
	        		return d.Idx;
	        	});
	        	var raw = $scope.highData;
	        	var data = [];
	        	raw.forEach(function(d, i) {
        			var index = getIndexFromComm(d) * types.length + types.indexOf(d.Type);
        			if(!data[index]) data[index] = 1;
        			else data[index]++;
	        	});

	        	for(var i = 0; i < communities.length * types.length; i++) {
	        		data[i] = data[i] || 0;
	        	}

	        	console.log(data)

	        	svgComms.attr("width", communities.length * gridSize + 10)
						.attr("height", 60);

	        	svgTypes.attr("width", 80)
	        			.attr("height", types.length * gridSize);

	        	svg.attr("width", communities.length * gridSize)
	        	   .attr("height", types.length * gridSize);

	        	commGroup.selectAll("*").remove();
	        	typeGroup.selectAll("*").remove();
	        	svgGroup.selectAll("*").remove();

	        	commLabels = commGroup.selectAll(".commLabel")
	        						  .data(communities)
	        						  .enter().append("text")
	        						  .text(function(d) { return d.Abbr; })
	        						  .attr("x", function(d, i) { return i * gridSize; })
	        						  .attr("y", 0)
	        						  .style("text-anchor", "start")
	        						  .attr("transform", function(d, i) {
	        						  	return "translate(10,60)rotate(-45,"+ i * gridSize +",0)";
	        						  })
	        						  .attr("class", "mono");

            	typeLabels = typeGroup.selectAll(".typeLabel")
            					.data(types)
            					.enter()
            					.append("text")
            					.text(function (d, i) { return getAbbreviation(d); })
            					.attr("x", 0)
            					.attr("y", function (d, i) { return i * gridSize; })
            					.style("text-anchor", "end")
            					.attr("transform", "translate(60," +  2 * gridSize / 3 + ")")
            					.attr("class", "mono");
	        	
	        	var colorScale = d3.scale.quantile()
	        							 .domain([0, colors.length, d3.max(data, function (d) { return d; })])
	        							 .range(colors);

	        	cards = svgGroup.selectAll(".hour")
	        			   .data(data);

	        	cards.append("title");
	        	cards.enter().append("rect")
	        		 		.attr("x", function(d, i) { return getCommFromIndex(i) * gridSize; })
	        		 		.attr("y", function(d, i) { return getTypeFromIndex(i) * gridSize; })
	        		 		.attr("rx", 4)
	        		 		.attr("ry", 4)
	        		 		.attr("class", "bordered")
	        		 		.attr("width", gridSize)
	        		 		.attr("height", gridSize)
	        		 		.style("fill", function(d) { var t = d || 0; return colorScale(t) })
	        		 		.on("mouseover", function(d, i) {
	        		 		 	var divComm = communities[getCommFromIndex(i)].Name;
	        		 		 	var divType = types[getTypeFromIndex(i)];
	        		 		     div.transition()
	        		 		        .duration(200)
	        		 		        .style("opacity", .9);
	        		 		     div.html("Location: " + divComm + "<br /> Offense: " + divType + "<br /> Freq: " + d)
	        		 		        .style("left", (d3.event.pageX) + "px")
	        		 		        .style("top", (d3.event.pageY - 28) + "px");
	        		 		})
	        		 		.on("mouseout", function(d) {
	        		 		 	 div.transition()
	        		 		 	    .duration(500)
	        		 		 	    .style("opacity", 0);
	        		 		});

	            cards.select("title").text(function(d) { return d; });
	            cards.exit().remove();

	            var legend = svgLegend.selectAll(".legend")
	            				.data([0].concat(colorScale.quantiles()), function(d) { return d; });
	            legend.enter().append("g")
	            			  .attr("class", "legend");

	            legend.append("rect")
	            	  .attr("x", function(d, i) { return legendElementWidth * i; })
	            	  .attr("y", 14)
	            	  .attr("width", legendElementWidth)
	            	  .attr("height", gridSize / 2)
	            	  .style("fill", function(d, i) { return colors[i]; });

	            legend.append("text")
	            	  .attr("class", "mono")
	            	  .text(function(d) { return "≥ " + Math.round(d); })
	            	  .attr("x", function(d, i) { return legendElementWidth * i; })
	            	  .attr("y", 50);
	            legend.exit().remove();
	            done();
			}
		}
	};
});