const express = require('express');
const app = express();
const accountRoutes = express.Router();

// Require Account model in our routes module
let Account = require('../models/Account');

// Defined store route
accountRoutes.route('/add').post(function (req, res) {
  let account = new Account(req.body);
  account.save()
    .then(account => {
      res.status(200).json({'account': 'account in added successfully'});
      console.log('account added successfully!')
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
accountRoutes.route('/').get(function (req, res) {
  Account.find(function (err, accounts){
    if(err){
      console.log(err);
    }
    else {
      res.json(accounts);
    }
  });
});

// Defined edit route
accountRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Account.findById(id, function (err, account){
      res.json(account);
      console.log('Edited account successfully!');
  });
});

//  Defined update route
accountRoutes.route('/update/:id').post(function (req, res) {
  Account.findById(req.params.id, function(err, account) {
    if (!account)
      return next(new Error('Could not load Document'));
    else {
      account.accountLogin = req.body.accountLogin;
      account.accountPassword = req.body.accountPassword;
      account.accountEmail = req.body.accountEmail;
      account.isAdmin = req.body.isAdmin;

      account.save().then(account => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
accountRoutes.route('/delete/:id').get(function (req, res) {
  Account.findByIdAndRemove({_id: req.params.id}, function(err, account){
        if(err) res.json(err);
        else res.json('Successfully removed');
        console.log('Successfully deleted account');
    });
});

module.exports = accountRoutes;
