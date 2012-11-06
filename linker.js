exports.link = function(dest, target) {
	var fs = require('fs'),
		//tar = require('tar-async'),
		//target = ['js', 'css', 'html'],
		Handler,
		_,
		i,
		handler;

	Handler = function(type) {
		this.type = type;
		this.dirname = __dirname + '/staticSource/' + type + '/';
		this.struct =JSON.parse(
			fs.readFileSync(
				__dirname + '/staticSource/' + dest + type + '.json',
				'utf-8'
			)
		);
	};

	_ = Handler.prototype;

	_.linkedContent = function() {
		var i,
			j,
			subdir,
			filename,
			content = '';

		for(i = 0; i < this.struct.length; i++) {
			subdir = this.dirname + this.struct[i]['name'];
			filename = this.struct[i]['sub'];

			for(j = 0; j < filename.length; j++) {
				content += fs.readFileSync(
					subdir + '/' + filename[j],
					'utf-8'
				);
				content += '\n\n';
			}
		}
		
		return content;
	};

	for(i = 0; i < target.length; i++) {
		handler = new Handler(target[i]);

		fs.writeFileSync(
			__dirname + '/static/' + dest + '.' + handler.type,
			handler.linkedContent(),
			'utf-8'
		);
	}
};
