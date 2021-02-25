if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const expressLayout = require('express-ejs-layouts');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');

const passportLocalStrategy = require('./config/localStrategy');
passportLocalStrategy(passport);

const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(express.urlencoded({ extended: false }));
app.use(expressLayout);
app.use(express.static('public'));
app.use(
	session({
		secret: process.env.SESSION_SECRECT,
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

(async () => {
	try {
		const { connection } = await mongoose.connect(process.env.DATABASE_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log(`Connected To Database(${connection.host}) `);
	} catch (err) {
		console.log(err.message);
	}
})();

app.use('/', indexRoutes);
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);

app.listen(process.env.PORT, () =>
	console.log(`Server started on port ${process.env.PORT}`)
);
