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
const MongoStore = require('connect-mongo').default;
const methodOverride = require('method-override');

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

const passportLocalStrategy = require('./config/localStrategy');
passportLocalStrategy(passport);

const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(expressLayout);
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(
	session({
		secret: process.env.SESSION_SECRECT,
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({ mongoUrl: process.env.DATABASE_URI }),
		cookie: {
			maxAge: MILLISECONDS_PER_DAY,
		},
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
			useFindAndModify: false,
		});
		console.log(`Connected To Database(${connection.host}) `);
	} catch (err) {
		console.log(err.message);
	}
})();

app.use('/', express.static('public'));
app.use('/', indexRoutes);

app.use('/users', express.static('public'));
app.use('/users', usersRoutes);

app.use('/products', express.static('public'));
app.use('/products', productsRoutes);

app.use('/cart', express.static('public'));
app.use('/cart', cartRoutes);

app.listen(process.env.PORT, () =>
	console.log(`Server started on port ${process.env.PORT}`)
);
