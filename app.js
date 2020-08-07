const express = require('express');
const app = express();
const path = require('path');
const Quote = require('./models').Quote;
const mdbootstrap = require('mdbootstrap');

const routes = require('./router/routes');


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('public'));

app.use('/', routes);

// app.listen(3000, () => {
//     console.log("App is running on port 3000.")
// });

// error handler
app.use( (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

module.exports = app;