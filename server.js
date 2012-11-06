
/**
 * Module dependencies.
 */

var start_server = function() {

	var express = require('express'),
//		routes = require('./routes'),
		router = require('./router'),
		http = require('http'),
		path = require('path'),
		fs = require('fs'),
//        redisStore = require('connect-redis')(express),
		linker = require('./linker'),
		app = express(),
		knowreRouter = router.initialize(app);

        /// HTTPS ///
        /* 
		https = require('https'),
        sslkey = fs.readFileSync('https/ssl-key.pem'),
        sslcert = fs.readFileSync('https/ssl-cert.pem'),
        options = {
            key: sslkey,
            cert: sslcert
        };
        */

	if(process.env.NODE_ENV) {
		app.settings.env = (( process.env.NODE_ENV ).trim().toLowerCase() == 'production' ) ? 'production' : 'development';
	} else {
		app.settings.env = 'development';
	}
	app.settings.staticPhrase = 'Starcraft';

	app.configure(function() {
		app.set('port', process.env.PORT || 8888)
		app.set('views', __dirname + '/views');
		app.set('view engine', 'jade');
		app.use(express.favicon());
		//app.use(express.favicon('static/favicon/knowre.ico'));
		app.use(express.logger('dev'));
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(express.cookieParser());
		app.use(express.session({
            secret: "keyboard cat",
            maxAge: new Date(Date.now() + 3600000),
//            store: new redisStore
        }));

		app.use(app.router);

		app.configure('development', function() {
			app.use('/static', express.static(path.join(__dirname, 'static')));
		});
	});

/*
	app.get('/', function(req,res){
		app.configure('development', function(){
			linker.link(app.settings.staticPhrase, ['js', 'css', 'html']);
			binder.bind(app.settings.staticPhrase);
			app.use(express.errorHandler());
			app.disable('view cache');
			res.sendfile(__dirname + '/static/' + app.settings.staticPhrase + '.html');
		});

		app.configure('production', function(){
			res.sendfile(__dirname + '/static/' + app.settings.staticPhrase + '.html');
		});
	});

    app.get('/invitation',function(req,res){
        res.sendfile(__dirname+'/static/'+'Invitation.html');
    });

    app.get('/invitation/info', routes.info);
	app.post('/requestInvitation', routes.requestInvitation);
    
    app.get('/signUp',function(req,res){        
        if(Object.keys(req.query).length>0){
            req.session.email = req.query['email'];
            req.session.key = req.query['key'];
            res.redirect('/signUpProcess/');
        } else{
        	res.send("");
//            res.sendfile(__dirname+'/static/'+'signUp.html');  
        }
    });

	app.get('/signUpVerify',routes.signUpVerify);

	app.post('/sendInvitation', routes.sendInvitation);

	app.get('/signUpProcess', function(req,res){
		app.configure('development', function(){
			linker.link(app.settings.staticPhrase, ['js', 'css']);
			linker.link(app.settings.staticPhrase + "SignUp", ['html']);
			binder.bind(app.settings.staticPhrase);
			app.use(express.errorHandler());
			app.disable('view cache');
			res.sendfile(__dirname + '/static/' + app.settings.staticPhrase + 'SignUp.html');
		});

		app.configure('production', function(){
			res.sendfile(__dirname + '/static/' + app.settings.staticPhrase + 'SignUp.html');
		});
	});

    app.post('/signUpSubmitStep1',routes.signUpSubmitStep1);

	app.post('/signUpRequestStep2', routes.signUpRequestStep2);
	app.post('/signUpSubmitStep2', routes.signUpSubmitStep2);

	//app.get('/signUpRequestStep3', routes.signUpRequestStep3);
	//app.post('/signUpSubmitStep3', routes.signUpSubmitStep3);

	app.get('/signUpRequestStep4', routes.signUpRequestStep4);
	app.post('/signUpSubmitStep4', routes.signUpSubmitStep4);

	app.get('/getProblem', routes.getProblem);
	app.post('/submitAnswer', routes.submitAnswer);
*/
    http.createServer(app).listen(app.get('port'), function(){
		console.log('Environment : ' + app.settings.env.toUpperCase() + ' MODE');
		console.log('Express server listening on port ' + app.get('port'));
	});


    ///// HTTPS CONNECTION /////
    /*
    https.createServer(options,app).listen(app.get('port'), function(){
		console.log('Environment : ' + app.settings.env.toUpperCase() + ' MODE');
		console.log('Express server listening on port ' + app.get('port'));
	});
    */
};

start_server();
