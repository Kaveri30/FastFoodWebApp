const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Item
let Item = new Schema({
  itemName: {
    type: String
  },
  itemType: {
    type: String
  },
  itemPictureLocation: {
    type: String
  },
  itemPrice: {
    type: Number
  }
},{
    collection: 'Items'
});

module.exports = mongoose.model('Item', Item);
