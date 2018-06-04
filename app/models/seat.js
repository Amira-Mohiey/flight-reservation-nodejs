var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SeatSchema   = new Schema({
    name: String,
    reserved: Boolean,
    user: { type: Schema.Types.ObjectId, ref:'User' },
});

module.exports = mongoose.model('Seat', SeatSchema);