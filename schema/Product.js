const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	productImage: {
		type: Buffer,
		required: true,
	},
	productImageType: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

productSchema.virtual('productImageLink').get(function () {
	if (this.productImage != null && this.productImageType != null) {
		return `data:${
			this.productImageType
		};charset=utf-8;base64,${this.productImage.toString('base64')}`;
	}
});

module.exports = mongoose.model('Product', productSchema);
