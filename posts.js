const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    title: 'string',
    desc: 'string'
});

const model = mongoose.model('posts',postSchema);

module.exports = model;