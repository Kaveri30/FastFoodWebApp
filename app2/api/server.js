const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./DB');

const itemRoute = require('./routes/item.route');
const accountRoute = require('./routes/account.route');
const orderRoute = require('./routes/order.route');
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/item', itemRoute);
app.use('/account', accountRoute);
app.use('/order', orderRoute);
const port = process.env.PORT || 3000;

const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});
