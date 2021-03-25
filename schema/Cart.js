const mongoose = require('mongoose');
const Product = require('./Product');

const cartSchema = new mongoose.Schema({
	customerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	cartItems: {
		type: [
			{
				itemId: String,
				name: String,
				price: Number,
				image: String,
				quantity: Number,
			},
		],
	},
	totalPrice: {
		type: Number,
	},
	totalItems: {
		type: Number,
	},
	lastUpdate: {
		type: Date,
		default: Date.now(),
	},
});

cartSchema.pre('save', function (next) {
	let price = 0;
	this.totalItems = this.cartItems.length;
	this.cartItems.forEach((item) => {
		price += item.price * item.quantity;
	});
	this.totalPrice = price;
	this.lastUpdate = Date.now();
	next();
});

module.exports = mongoose.model('Cart', cartSchema);
