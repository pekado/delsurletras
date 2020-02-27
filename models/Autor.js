var keystone = require('keystone');
var Types = keystone.Field.Types;
var myStorage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: {
        path: keystone.expandPath('./public/uploads/files'), // required; path where the files should be stored
        publicPath: '/public/uploads/files/autores', // path where files will be served
    }
});
/**
 * Gallery Model
 * =============
 */

var Autor = new keystone.List('autor', {
	map: { name: 'name' },
	autokey: { from: 'name', path: 'slug', sparse: true },
});

Autor.add({
	name: { type: String, required: true, noedit: true },
	image: { type: Types.File,
		storage: myStorage },
	bio: {
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
});

Autor.register();
