
var express = require('express');
var csv = require('csv-parser')
var fs = require('fs')

var app = express();

app.use('/', express.static('.'));

app.get('/test', function(req, res) {
    res.send("Testing");
});

app.get('/data', function(req, res) {
    var b = [];
    var begin = parseInt(req.query.begin, 10);
    var end = parseInt(req.query.end, 10);
    var communities = req.query.comms.split(',');
    var types = req.query.types.split(',');
    var a = Date.now();

    data.forEach(function(d) {
        var year = new Date(d.Date).getFullYear();
        if(year >= begin && year <= end) {
            if(communities.indexOf(d["Community Area"]) != -1 || communities[0] == "all") {
                if(types.indexOf(d["Primary Type"]) != -1 || types[0] == "all") {
                    b.push(d);
                }
            }
        }
    });

    var z = Date.now() - a;
    console.log("fetched " + b.length + " records in "  + z + " milliseconds")
    res.send(b)
});

var port = 3000;
app.listen(port, function() {
	console.log("Crime Node Server running on port: " + port);
    loadData();
});

var data;
function loadData() {
    data = [];
    fs.createReadStream('data/smallset.csv')
    .pipe(csv())
    .on('data', function (d) {
        data.push(d);
    })
    .on('end', function () {
        console.log(data.length + " records loaded successfully");
    })
};
