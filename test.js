/*jshint esversion:6 */

var fs = require('fs');
var http = require("http");

var homework2 = [
    {name: "Knowledge",Period: 2, Grade: "D", hwDone:false},
    {name: "PhysEd", Period: 3, Grade: "F", hwDone:false},
	{name: "English", Period: 1, Grade: "F", hwDone:false},
	{name: "Math", Period: 5, Grade: "A", hwDone:false},
	{name:"Religion", Period: 4, Grade: "C", hwDone:false},
	{name: "VideoProd", Period: 6, Grade: "B", hwDone:false},
	];

var server = http.createServer((req, res) => {
	if (req.url === "/test.html" || req.url === "/"){
		fs.readFile("test.html", (err, data) => {
			res.write(data);
			res.end();
		});
	}else if(req.url === "/homework2") {
		if (req.method === "GET") {
			res.write(JSON.stringify(homework2));
			res.end();
		} else if (req.method === "POST") {
			var queryData = "";
			req.on('data', function(data) {
				queryData += data; // need to understand querydata
				if(queryData.length > 1e6) {//kill the connection if they are giving us moby dick
					queryData = "";
					res.writeHead(413, {'Content-Type': 'text/plain'}).end();
					req.connection.destroy();
				}
			});

			req.on('end', function(){
				var store = {name: queryData, Period: homework2.length+1, Grade: "X", hwDone:false};
				homework2.push(store);
			});
			res.end();
		}

	}else if(req.url === "/homeworkCheck"){
		if(req.method=== "POST"){
			var className = "";
			req.on('data',function(data){
				className += data;
			});
			req.on('end',function(){
				for(var i in homework2){
					if(className === homework2[i].name){
						homework2[i].hwDone = true;
						return;
					}
				}
				
			});
			res.end();
		}

	} else {
		res.write("Something is weird!");
		res.end();
	}
});

server.listen(8000, () => {
	console.log("Server started on port 8000");
});



