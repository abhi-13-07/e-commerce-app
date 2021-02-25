const router = require('express').Router();
const Product = require('../schema/Product');

router.get('/', async (req, res) => {
	const products = await Product.find();
	const params = {
		products,
	};
	if (req.isAuthenticated()) {
		params.auth = true;
		params.user = req.user;
	}
	res.render('index', params);
});

router.get('/cart', (req, res) => {
	res.send('<h1>Your Cart</h1>');
});

module.exports = router;
