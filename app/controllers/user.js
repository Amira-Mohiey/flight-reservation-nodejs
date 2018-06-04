var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var UserModel = mongoose.model('User');

router.get('', function(req, res) {//list seats
        UserModel.find({}, null, { sort: { '_id': 1 } }).populate('seat').exec(function(err, result) {
            if (err)
                res.send(err);

            res.json(result);
        });
    })

module.exports = router;