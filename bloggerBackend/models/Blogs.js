const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    tags: [String],
    imageUrl: String,
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
    publishDate: Date
});

module.exports = mongoose.model('Blog', blogSchema);
