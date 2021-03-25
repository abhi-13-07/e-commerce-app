const router = require('express').Router();
const Cart = require('../schema/Cart');
const Product = require('../schema/Product');

const { renderPage, isExisting, getTotal } = require('../helper/helper');

router.get('/', async (req, res) => {
	try {
		if (req.isAuthenticated()) {
			const cart = await Cart.findOne({ customerId: req.user.id });
			renderPage(req, res, 'cart/cart', { cart: cart });
		} else {
			renderPage(req, res, 'cart/cart', {});
		}
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
		const item = {
			itemId: product.id,
			name: product.name,
			price: product.price,
			image: product.productImageLink,
			quantity: 1, // default quantity when item is add to cart
		};
		const cart = await Cart.findOne({ customerId });
		if (!cart) {
			newCart.cartItems = [item];
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

		await cart.save();

		req.flash('success', `Successfully added ${product.name} to cart`);
		res.redirect('/');
	} catch (err) {
		console.log(err);
	}
});

router.put('/update/:id', async (req, res) => {
	const itemId = req.params.id;
	const customerId = req.user.id;
	try {
		const cart = await Cart.findOne({ customerId });
		cart.cartItems = cart.cartItems.map((item) => {
			if (item.id === itemId) {
				item.quantity = parseInt(req.body.quantity);
				return item;
			}
			return item;
		});
		await cart.save();
		res.redirect('/cart');
	} catch (err) {
		console.log(err);
	}
});

router.delete('/delete/:id', async (req, res) => {
	const itemId = req.params.id;
	const customerId = req.user.id;
	try {
		const cart = await Cart.findOne({ customerId });
		cart.cartItems = cart.cartItems.filter((item) => item.id !== itemId);
		await cart.save();
		res.redirect('/cart');
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
