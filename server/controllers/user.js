const User = require('../models/User.js')
const { comparePass, jwtSign } = require('../helpers/util.js')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
require('dotenv').config()

module.exports = {
    authGoogle: (req, res) => {
        let payload = null
        client
            .verifyIdToken({
                idToken: req.body.idToken,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            .then(ticket => {
                payload = ticket.getPayload()
                return User
                    .findOne({ email: payload.email })
            })
            .then(user => {
                if (!user) {
                    return User
                        .create({
                            email: payload.email,
                            password: process.env.GOOGLE_PASS,
                            fullName: payload.name,
                            profilePhoto: payload.picture
                        })
                        .then(newUser => {
                            let googleUser = {
                                email: newUser.email,
                                id: newUser._id
                            }
                            res.status(201).json({
                                message: `create success`,
                                data: newUser,
                                token: jwtSign(googleUser)
                            })
                        })
                } else {
                    let googleUser = {
                        email: user.email,
                        id: user._id
                    }
                    res.status(200).json({
                        message: `sign in success`,
                        token: jwtSign(googleUser)
                    })
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    message: `internal server error`
                })
            })
    },
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
                        res.status(200).json({ token, id:user._id, fullName: user.fullName })
                    }
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: `server error`, err })
            })
    },
    getAllUser: (req, res) => {
        User
            .find({})
            .then(users => {
                res.status(200).json(users)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: `server error`, err })
            })
    }
}