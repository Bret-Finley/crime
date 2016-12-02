angular.module('app')

.directive("crimeBargraph", function(UtilSrvc) {
	return {
		restrict: 'E',
		template: '<div id="graph"></div>',
		link: function($scope, element, attrs) {

			$scope.$watch(function() {
				return $scope.highData;
			}, function() {
				//console.log("High Data is changing!")
				update();
			}, true);

			var margin = { top: 50, right: 0, bottom: 100, left: 50 };
		    var width = 960 - margin.left - margin.right;
	        var height = 430 - margin.top - margin.bottom;
	        var svg = d3.select("#graph").append("svg")
            							 .attr("width", width + margin.left + margin.right)
            							 .attr("height", height + margin.top + margin.bottom)
            							 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            var start = 2010;
			var end = 2012;
            function dateToIndex(d) {
            	return (d.getFullYear() - start) * 12 + d.getMonth();
            };

            function indexToDate(i) {
            	i++;
            	var month = i % 12;
            	var year = Math.floor(i / 12) + start;
            	return month + "/" + year.toString().substring(2);
            };

			function update() {
				if(!$scope.highData) return;
				var raw = $scope.highData;
				var data = [];
				
				var numMonths = (end - start + 1) * 12;
				raw.forEach(function(d, i) {
					var index = dateToIndex(d.Date);
					if(!data[index]) data[index] = 1;
	        		else data[index]++;
				});

				for(var i = 0; i < numMonths; i++) {
					if(!data[i])
						data[i] = 0;
				}

				var x = d3.scale.linear()
						  .domain([0, data.length])
						  .range([0, width]);
				var y = d3.scale.linear()
								.domain([0, d3.max(data)])
								.range([0, height]);

				var xAxis = d3.svg.axis()
								  .scale(x)
								  .tickValues(d3.range(0, data.length, 2))
								  .tickFormat(function(d) { return indexToDate(d); })
								  .orient("bottom");

				svg.selectAll("rect")
				   .data(data)
				   .enter()
				   .append("rect")
				   .attr("x", function(d, i) { return x(i); })
				   .attr("y", function(d) { return height - y(d); })
				   .attr("width", 5)
				   .attr("height", function(d) { return y(d); });

				svg.append("g")
				   .attr("transform", "translate(0, 280)")
				   .call(xAxis)
				   .selectAll("text")
				   .style("text-anchor", "middle");
			}
		}
	}
})