var keystone = require('keystone');
var Types = keystone.Field.Types;

var myStorage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: {
        path: keystone.expandPath('./public/uploads/files'), // required; path where the files should be stored
        publicPath: '/public/uploads/files', // path where files will be served
    }
});
/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Post.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: String },
	publishedDate: { type: Types.Date, index: true },
	image: {  type: Types.File,
				storage: myStorage },
	reseña: {
		corta: { type: Types.Html, wysiwyg: true, height: 150 },
		extendida: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	ficha: { formato: {type: String, wysiwyg:true, height:50 },
			paginas: {type: String, wysiwyg:true, height:50 }	
		},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
});

Post.schema.virtual('reseña.full').get(function () {
	return this.reseña.extendida || this.reseña.corta;
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
