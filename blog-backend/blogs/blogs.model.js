const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    description: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
}, { timestamps: true })

module.exports = mongoose.model('blogs', blogSchema, 'blogs');