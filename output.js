var jade = require('jade'), http = require('http'), server;

function start(template, options) {
	server = http.createServer(function (request, response) {
		getTemplate(response, template, options );
	}).listen(8000);
}

function getTemplate(response, template, options) {
	var data;
	jade.renderFile(template, options, function (error, html){
		if (error){
			//console.log(error)
			data = error;
		}else{
			//console.log(html)
			data = html;
		}

		response.writeHead(200, {'content-type': 'text/html'});
		response.write(data)
		response.end();
	});
}

exports.start = start;