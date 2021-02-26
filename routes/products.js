const router = require('express').Router();
const Product = require('../schema/Product');

const restrictUnAuth = require('../middlewares/restrictUnAuth');
const adminOnly = require('../middlewares/adminOnly');

const { saveProductImage, renderPage } = require('../helper/helper');

router.get('/', (req, res) => {
	res.send('Products Page');
});

router.get('/add', restrictUnAuth, adminOnly, (req, res) => {
	renderPage(req, res, 'products/new', {});
});

router.post('/add', restrictUnAuth, adminOnly, async (req, res) => {
	const { name, price, description, imageLink } = req.body;
	const product = new Product({
		name,
		price,
		description,
	});
	try {
		saveProductImage(product, imageLink);
		const newProduct = await product.save();
		res.redirect(`/products/${newProduct.id}`);
	} catch (err) {
		req.flash('error', `${err.message}`);
		res.redirect('/');
		console.log(err);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		const params = {
			product,
		};
		renderPage(req, res, 'products/product', params);
	} catch (err) {
		console.log(err.message);
	}
});

module.exports = router;
