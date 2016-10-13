/*jshint esversion:6 */

var fs = require('fs');
var http = require("http");

var grades = {
    Algebra : "A",
    "Phys Ed" : "C",
    English : "B",
    Math: "D",
    Religion : "D-",
    "Video Prod" : "A"
	};

var sched = {
    Algebra :   "1st Period",
    "Phys Ed" : "2nd Period",
    English :  	"3rd Period",
    Math:       "4th Period",
    Religion :  "5th Period",
    "Video Prod" : "6th Period"
	};

var homework = {
    Algebra : false,
    "Phys Ed" : false,
    English : false,
    Math: false,
    Religion : false,
    "Video Prod" : false
	};


/*
	function pull(fileName){
	fs.readFile(fileName, function(err, data) {
	if (err) {
			console.log("Unable to read from file");
		} else {
			console.log(data); //toString();
		}
	});
}
*/

var server = http.createServer((req, res) => {
	if (req.url === "/test.html" || req.url === "/"){
		fs.readFile("test.html", (err, data) => {
			res.write(data);
			res.end();
		});
	} else if(req.url === "/grades") {
		if (req.method === "GET") {
			res.write(JSON.stringify(grades));
			res.end();
		}
	} else if(req.url === "/homework") {
		if (req.method === "GET") {
			res.write(JSON.stringify(homework));
			res.end();
		}
	} else if(req.url === "/sched") {
	if (req.method === "GET") {
		res.write(JSON.stringify(sched));
		res.end();
		}
	} else if (req.method === "POST") {
		var queryData = "";

		req.on('data', function(data) {
			queryData += data; // need to understand querydata
			if(queryData.length > 1e6) {
				queryData = "";
				res.writeHead(413, {'Content-Type': 'text/plain'}).end();
				req.connection.destroy();
			}
		});

		req.on('end', function() {
			grades.push(queryData);
		});
	} else {
		res.write("Something is weird!");
		res.end();
	}
});

server.listen(8000, () => {
	console.log("Server started on port 8000");
});



