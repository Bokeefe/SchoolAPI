/*jshint esversion:6 */

var fs = require('fs');
var http = require("http");

var grades = {
    algebra : "A",
    "p.e." : "C",
    english : "B"
	};

var sched = ["algebra", "p.e.", "english"];

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



