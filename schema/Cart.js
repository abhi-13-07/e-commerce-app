const mongoose = require('mongoose');
const Product = require('./Product');

const cartSchema = new mongoose.Schema({
	customerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	cartItems: {
		type: [Object],
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

// cartSchema.pre('save', function (next) {
// 	let price = 0;
// 	this.totalItems = this.cartItems.length;
// 	this.cartItems.forEach((item) => {
// 		price += item.price;
// 	});
// 	this.totalPrice = price;
// 	this.lastUpdate = Date.now();
// 	next();
// });

// cartSchema.pre('updateOne', function (next) {
// 	console.log(this.query);
// 	const items = this._update.cartItems;
// 	let price = 0;
// 	this.totalItems = items.length;
// 	items.forEach((item) => {
// 		price += item.price;
// 	});
// 	this.totalPrice += price;
// 	this.lastUpdate = Date.now();
// 	next();
// });

module.exports = mongoose.model('Cart', cartSchema);
