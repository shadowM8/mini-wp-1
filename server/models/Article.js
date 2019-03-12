const mongoose = require('mongoose')
const Schema = mongoose.Schema

articleSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    content: {
        type: String
    },
    image: {
        type: String
    },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })