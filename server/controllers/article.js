const Article = require('../models/Article')

module.exports = {
    create: (req, res) => {
        Article
            .create({
                title: req.body.title,
                description: req.body.description,
                content: req.body.content,
                user: req.user.id
            })
            .then(article => {
                res.status(201).json(article)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: `server error`, err })
            })
    },
    readAll: (req, res) => {
        Article
            .find({}).sort({ createdAt: 'desc' }).populate('user')
            .then(articles => {
                if (req.query.title) {
                    articles = articles.filter(article => {
                        return new RegExp(".*" + req.query.title + ".*", "i").test(article.title)
                    })

                }
                res.status(200).json(articles)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: `server error`, err })
            })
    },
    readOne: (req, res) => {
        Article
            .findOne({ _id: req.params.id }).populate('user')
            .then(article => {
                if (!article) res.status(400).json({ message: `article not found` })
                else res.status(200).json(article)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: `server error`, err })
            })
    },
    update: (req, res) => {
        Article
            .findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
            .then(article => {
                if (!article) res.status(400).json({ message: `article not found` })
                else res.status(200).json(article)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: `server error`, err })
            })
    },
    delete: (req, res) => {
        Article
            .findOneAndDelete({ _id: req.params.id })
            .then(article => {
                if (!article) res.status(400).json({ message: `article not found` })
                else res.status(200).json(article)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: `server error`, err })
            })
    }
}