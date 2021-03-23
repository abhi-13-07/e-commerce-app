const router = require('express').Router();
const Cart = require('../schema/Cart');
const User = require('../schema/User');
const Product = require('../schema/Product');

const Item = require('../utils/ItemConstructor');
const { renderPage, isExisting, getTotal } = require('../helper/helper');

router.get('/', async (req, res) => {
	try {
		const cartItems = await Cart.findOne({ customerId: req.user.id });
		console.log(cartItems);
		res.send(`<h1>${req.user.name}'s Cart</h1>`);
	} catch (err) {
		console.log(err);
	}
});

router.post('/add/:id', async (req, res) => {
	const customerId = req.user.id;
	const productId = req.params.id;
	const newCart = new Cart({
		customerId,
	});
	try {
		const product = await Product.findById(productId);
		const item = new Item({
			id: product.id,
			name: product.name,
			price: product.price,
		});
		const cart = await Cart.findOne({ customerId });
		if (!cart) {
			newCart.cartItems = [item];
			newCart.totalPrice = getTotal(newCart.cartItems);
			newCart.totalItems = newCart.cartItems.length;

			await newCart.save();
			req.flash('success', `Successfully added ${product.name} to cart`);
			return res.redirect('/');
		}

		if (isExisting(productId, cart.cartItems)) {
			req.flash('info', `${product.name} is already in your cart`);
			return res.redirect('/');
		}

		cart.cartItems = [...cart.cartItems, item];
		cart.totalPrice = getTotal(cart.cartItems);
		cart.totalItems = cart.cartItems.length;

		await cart.save();

		req.flash('success', `Successfully added ${product.name} to cart`);
		res.redirect('/');
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
