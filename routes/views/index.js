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

		var q = keystone.list('autor').model.find();

		q.exec(function (err, result) {
			locals.data.autor = result;
			console.log(locals.data.autor);
			next(err);
		});

	});
	// Load the posts
	view.on('init', function (next) {

		var q = keystone.list('Post').model.find().limit(6).sort('publishedDate');
		q.exec(function (err, results) {
			locals.data.posts = results;
			console.log(locals.data.posts);
			next(err);
		});
	});
	// Render the view
	view.render('index');
};
