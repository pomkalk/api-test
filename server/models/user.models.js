var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: String
},
{
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);