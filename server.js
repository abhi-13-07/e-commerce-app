if (NODE_ENV !== 'production') {
	require('dotenv').config();
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const expressLayout = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('express-flash');

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
		cookie: {
			secure: true,
		},
	})
);
app.use(flash());

(async () => {
	const { connection } = await mongoose.connect(process.env.DATABASE_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});
	console.log(`Connected To Database(${connection.host}) `);
})();

app.listen(process.env.PORT, () =>
	console.log(`Server started on port ${process.env.PORT}`)
);
