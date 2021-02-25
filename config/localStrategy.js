const LocalStrategy = require('passport-local').Strategy;
const User = require('../schema/User');
const bcrypt = require('bcrypt');

module.exports = (passport) => {
	passport.use(
		new LocalStrategy(
			{ usernameField: 'email' },
			async (email, password, done) => {
				const user = await User.findOne({ email: new RegExp(email, 'i') });
				if (!user) {
					return done(null, false, { message: 'Email is not registred' });
				}
				const isMatch = await bcrypt.compare(password, user.password);
				if (!isMatch) {
					return done(null, false, { message: 'incorrect password' });
				}
				return done(null, user);
			}
		)
	);
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});
};
