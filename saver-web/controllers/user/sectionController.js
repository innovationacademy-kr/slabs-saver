const moment = require('moment');
const { Article, Author } = require('../../models');
const converter = require('../../lib/converter');

module.exports = {
	section: (req, res, next) => {
		res.render('user/section', { title : 'slab-saver', layout: 'layout/userLayout' });
	},
}
