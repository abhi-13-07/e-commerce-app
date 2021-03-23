const router = require('express').Router();
const Product = require('../schema/Product');

const { renderPage } = require('../helper/helper');

router.get('/', async (req, res) => {
	const products = await Product.find();
	const params = {
		products,
	};
	renderPage(req, res, 'index', params);
});

module.exports = router;
