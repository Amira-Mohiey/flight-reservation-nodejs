var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    name: String,
    email: String,
    number: String,
    seat: { type: Schema.Types.ObjectId, ref: 'Seat' }
});

module.exports = mongoose.model('User', UserSchema);