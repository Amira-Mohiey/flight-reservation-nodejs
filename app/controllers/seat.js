var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var SeatModel = mongoose.model('Seat');
var UserModel = mongoose.model('User');

router.get('', function (req, res) {//list seats
    SeatModel.find({}, null, { sort: { '_id': 1 } }, function (err, result) {
        if (err) {
            res.json({ ok: false, error: err });
        } else {
            res.json({ ok: true, seats: result });
        }
    });
}).put('/:id', function (req, res) {  //update seat
    SeatModel.findById(req.params.id, function (err, seat) {
        if (err) {
            res.json({ ok: false, error: err });
        } else if (!seat.reserved) {
            var user = new UserModel({
                name: req.body.name,
                email: req.body.email,
                number: req.body.number,
                seat: seat._id
            })
            user.save(function (err, user) {
                if (err) {
                    res.json({
                        ok: false,
                        error: 'email already exist'
                    })
                } else {
                    SeatModel.update({ _id: seat.id }, { $set: { reserved: true, user: user._id } }, (err, seat) => {
                        if (!err) {
                            res.json({ ok: true, ticketId: user._id });
                        } else {
                            res.json({ ok: false, error: err });
                        }
                    })
                }
            });
        } else {
            res.json({
                ok: false,
                error: 'seat reserved'
            })
        }
    });
})

module.exports = router;