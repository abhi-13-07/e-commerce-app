const router = require('express').Router();
const User = require('../schema/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

const restrictAuth = require('../middlewares/restrictAuth');
const formValidate = require('../middlewares/formValidate');

router.get('/login', restrictAuth, (req, res) => {
	res.render('users/login');
});

router.post(
	'/login',
	restrictAuth,
	passport.authenticate('local', {
		successRedirect: '/',
		successFlash: "You've Logged in successfully!",
		failureRedirect: '/users/login',
		failureFlash: true,
	})
);

router.get('/register', restrictAuth, (req, res) => {
	res.render('users/register');
});

router.post('/register', restrictAuth, formValidate, async (req, res) => {
	const { name, email, password1 } = req.body;
	const user = new User({
		name,
		email,
	});
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password1, salt);
		user.password = hashedPassword;
		const newUser = await user.save();
		req.flash('success', `Now You can Login with ${newUser.email}`);
		res.redirect('/users/login');
	} catch (err) {
		console.log(err);
		req.flash('error', `${err.message}`);
		res.redirect('/users/register');
	}
});

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = router;
