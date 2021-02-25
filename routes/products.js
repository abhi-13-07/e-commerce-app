const router = require('express').Router();

const restrictUnAuth = require('../middlewares/restrictUnAuth');
const adminOnly = require('../middlewares/adminOnly');

router.get('/', (req, res) => {
	res.send('Products Page');
});

router.get('/add', restrictUnAuth, adminOnly, (req, res) => {
	res.render('products/addProducts', { auth: true, user: req.user });
});

module.exports = router;
