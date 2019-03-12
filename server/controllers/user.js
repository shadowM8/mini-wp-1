const User = require('../models/User.js')
const { comparePass, jwtSign } = require('../helpers/util.js')
require('dotenv').config()

module.exports = {
    register: (req, res) => {
        User
            .create({
                email: req.body.email,
                password: req.body.password,
                fullName: req.body.fullName
            })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: `server error`, err })
            })
    },
    login: (req, res) => {
        User
            .findOne({ email: req.body.email })
            .then(user => {
                if (!user) res.status(400).json({ message: `invalid username/password` })
                else {
                    if (!comparePass(req.body.password, user.password)) res.status(400).json({ message: `invalid username/password` })
                    else {
                        let payload = ({
                            id: user._id,
                            email: user.email,
                            fullName: user.fullName
                        })
                        let token = jwtSign(payload)
                        res.status(200).json({ token })
                    }
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: `server error`, err })
            })
    }
}