module.exports = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash('info', 'You are not authorized to view this page');
	return res.redirect('/users/login');
};
