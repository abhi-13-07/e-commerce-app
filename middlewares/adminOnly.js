module.exports = (req, res, next) => {
	if (req.user.role === 'admin') {
		return next();
	}
	req.flash('info', 'You are not allowed to view this page');
	return res.redirect('/');
};
