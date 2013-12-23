"use strict";

// node ~/scripts/nodetest5.js www.spike.com /video-clip "#carousel_holder_0 ul li a"
// node ~/scripts/nodetest5.js losangeles.craigslist.org /w4m/ "#toc_rows .row>a"

function start (args, cb) {
	var http = require ('http'), $ = require("jquery"), chunks,
	selector = args[2], postsArray = [], locationArray = [], locationObject = {}, i;

	var req = http.get({ host: args.url, path: args.type}, function (res) {
		console.log ('STATUS: ' + res.statusCode);
		res.setEncoding('utf8');
		if (res.statusCode == "200") {
			res.on('data', function (chunk){
			 	chunks += " " + chunk;
			});
		} else {
			console.log ("ERROR: " + res.statusCode);
		}
		res.on('end', function () {
			console.log( "finshed!!!"); 
			cb(parseData(chunks));
		});
	});

	req.on('error', function (e) {
		console.log('probelm with request: ' + e.message);
	});

	function parseData(data){
		$(data).find(args.selector).each(function (index) {
			var node = $(this);
			postsArray.push (node.attr("href"));
		});
		return determineLocationCount();
	}

	function determineLocationCount() {
		for (i in postsArray) {
			var key = postsArray[i].match(/[a-z]{3}/);
			if (locationObject[key]) {
				locationObject[key] = locationObject[key] += 1
			} else {
				locationObject[key] = 1;
			}
		}
		return messageData();
	}

	function messageData(){
		for (i in locationObject) {
			locationArray.push( [i,locationObject[i]] );
		}
		return {
			data: locationArray
		};
	}
}

exports.start = start;