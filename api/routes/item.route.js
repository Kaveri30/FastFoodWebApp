const express = require('express');
const app = express();
const itemRoutes = express.Router();

// Require Item model in our routes module
let Item = require('../models/Item');

// Defined store route
itemRoutes.route('/add').post(function (req, res) {
  let item = new Item(req.body);
  item.save()
    .then(item => {
      res.status(200).json({'item': 'item in added successfully'});
      console.log('Item added successfully!')
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
itemRoutes.route('/').get(function (req, res) {
    Item.find(function (err, items){
    if(err){
      console.log(err);
    }
    else {
      res.json(items);
    }
  });
});

// Defined edit route
itemRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Item.findById(id, function (err, item){
      res.json(item);
      console.log('Edited item successfully!');
  });
});

//  Defined update route
itemRoutes.route('/update/:id').post(function (req, res) {
    Item.findById(req.params.id, function(err, item) {
    if (!item)
      return next(new Error('Could not load Document'));
    else {
      item.itemName = req.body.itemName;
      item.itemType = req.body.itemType;
      item.itemPictureLocation = req.body.itemPictureLocation;
      item.itemPrice = req.body.itemPrice;

      item.save().then(item => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
itemRoutes.route('/delete/:id').get(function (req, res) {
    Item.findByIdAndRemove({_id: req.params.id}, function(err, item){
        if(err) res.json(err);
        else res.json('Successfully removed');
        console.log('Successfully deleted item');
    });
});

module.exports = itemRoutes;
