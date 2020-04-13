var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.data = {
		autores: [],
		posts: [],
	};
	view.on('init', function (next) {

		var q = keystone.list('autor').model.find({ "name": { $in: ["Luciano Lutereau", "Ricardo Manetti", "Márgara Averbach", "Fernando Bogado", "Massimo Recalcati", "Agustina Caride", "Verónica Boix", "Walter Lezcano"] }}).sort({_id: 1});

		q.exec(function (err, result) {
			locals.data.autor = result;
			console.log(locals.data.autor);
			next(err);
		});

	});

	// Load the posts
	view.on('init', function (next) {

		var q = keystone.list('Post').model.find().limit(9).sort({publishedDate: -1});
		q.exec(function (err, results) {
			locals.data.posts = results;
			
			next(err);
		});
	});
	// Render the view
	view.render('index');
};
