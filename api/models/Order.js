const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Order
let Order = new Schema({
  orderID: {
    type: String
  },
  orderCreateTime: {
    type: String
  },
  orderPayer: {
    type: String
  },
  orderPurchaseItems: {
    type: Array
  }
},{
    collection: 'Orders'
});

module.exports = mongoose.model('Order', Order);
