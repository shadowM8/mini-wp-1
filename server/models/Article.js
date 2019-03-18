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
    featured_image: {
        type: String,
        default : `https://wallpapercave.com/wp/7jKtgQb.jpg`
    },
    tags: [String],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const Article = mongoose.model('Article', articleSchema)

module.exports = Article