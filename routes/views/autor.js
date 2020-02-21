var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = '/';
	locals.filters = {
		autor: req.params.autor,
	};
	locals.data = {
		autor: [],
	};

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('autor').model.findOne({
			name: locals.filters.autor,
		});

		q.exec(function (err, result) {
			locals.data.autor = result;
			console.log(result);
			next(err);
		});

	});


	// Render the view
	view.render('autor');
};
