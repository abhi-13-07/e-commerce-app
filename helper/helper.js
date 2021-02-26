module.exports = {
	renderPage: (req, res, page, params) => {
		if (req.isAuthenticated()) {
			params.auth = true;
			params.user = req.user;
		}
		res.render(page, params);
	},

	saveProductImage: (product, imageEncoded) => {
		const imageMimeType = ['image/jpeg', 'image/png', 'image/gif'];
		if (imageEncoded == null) return;
		const image = JSON.parse(imageEncoded);
		if (image !== null && imageMimeType.includes(image.type)) {
			product.productImage = new Buffer.from(image.data, 'base64');
			product.productImageType = image.type;
		}
	},
};
