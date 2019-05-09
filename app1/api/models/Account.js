const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Item
let Account = new Schema({
  accountLogin: {
    type: String
  },
  accountPassword: {
    type: String
  },
  accountEmail: {
    type: String
  },
  isAdmin: {
    type: Boolean
  }
},{
    collection: 'Accounts'
});

module.exports = mongoose.model('Account', Account);
