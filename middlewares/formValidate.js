module.exports = async (req, res, next) => {
	const { name, email, password1, password2 } = req.body;
	if ((!name || !email, !password1, !password2)) {
		req.flash('error', 'Please fill all the fields');
		return res.redirect('/users/register');
	}
	if (password1.length <= 6) {
		req.flash('error', 'Your password is too weak');
		return res.redirect('/users/register');
	}
	if (password1 !== password2) {
		req.flash('error', "Password does'nt match");
		return res.redirect('/users/register');
	}
	try {
		const user = User.findOne({ email: email });
		if (user) {
			req.flash('error', 'Email already exists');
			return res.redirect('/users/register');
		}
	} catch (err) {
		return console.log(err.message);
	}
	return next();
};
