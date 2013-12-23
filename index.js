"use strict";
var get = require("./get"), output = require("./output"), data, config = {url:"losangeles.craigslist.org", type:"/w4w/", selector:"#toc_rows .row>a"},
outputData = function (data) {
	data.header = config.url;
	data.description = config.type;
	output.start("./template.jade", data);
}

data = get.start(config, outputData);