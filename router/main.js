exports.name = "main";

exports.main = function(req, res) {
	var app = res.app,
		express = require('express'),
		path = require('path'),
		filePath,
		linker = require('../linker');

	app.configure('development', function(){
		linker.link(app.settings.staticPhrase, ['js', 'css', 'html']);
		app.use(express.errorHandler());
		app.disable('view cache');
		filePath = path.normalize(__dirname + '/../static/' + app.settings.staticPhrase + '.html');
		res.sendfile(filePath);
	});

	app.configure('production', function(){
		filePath = path.normalize(__dirname + '/../static/' + app.settings.staticPhrase + '.html');
		res.sendfile(filePath);
	});
};