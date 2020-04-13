
var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = '/..';
	locals.data = {
		autores: [],
	};

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('autor').model.find({ "name": { $in: ["Luciano Lutereau", "Ricardo Manetti", "Márgara Averbach", "Fernando Bogado", "Massimo Recalcati", "Agustina Caride", "Verónica Boix", "Walter Lezcano"] }});

		q.exec(function (err, result) {
			locals.data.autor = result;
			console.log(locals.data.autor);
			next(err);
		});

	});


	// Render the view
	view.render('autores');
};
