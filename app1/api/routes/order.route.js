const express = require('express');
const app = express();
const orderRoutes = express.Router();

// Require Order model in our routes module
let Order = require('../models/Order');

// Defined store route
orderRoutes.route('/add').post(function (req, res) {
  let order = new Order(req.body);
  order.save()
    .then(order => {
      res.status(200).json({'order': 'order in added successfully'});
      console.log('Order added successfully!')
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
orderRoutes.route('/').get(function (req, res) {
  Order.find(function (err, orders){
    if(err){
      console.log(err);
    }
    else {
      res.json(orders);
    }
  });
});

// Defined edit route
orderRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Order.findById(id, function (err, order){
      res.json(order);
      console.log('Edited order successfully!');
  });
});

//  Defined update route
orderRoutes.route('/update/:id').post(function (req, res) {
  Order.findById(req.params.id, function(err, order) {
    if (!order)
      return next(new Error('Could not load Document'));
    else {
      order.orderID = req.body.orderID;
      order.orderCreateTime = req.body.orderCreateTime;
      order.orderPayer = req.body.orderPayer;
      order.orderPurchaseItems = req.body.orderPurchaseItems;
      order.orderUser = req.body.orderUser;

      order.save().then(order => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
orderRoutes.route('/delete/:id').get(function (req, res) {
    Order.findByIdAndRemove({_id: req.params.id}, function(err, order){
        if(err) res.json(err);
        else res.json('Successfully removed');
        console.log('Successfully deleted order');
    });
});

module.exports = orderRoutes;
