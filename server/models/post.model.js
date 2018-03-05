var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'} 
}, {
    timestamps: true
});
module.exports = mongoose.model('Post', PostSchema);