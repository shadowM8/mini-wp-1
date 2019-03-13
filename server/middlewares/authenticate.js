const { jwtVerfiy } = require('../helpers/util')

function Authenticate(req, res, next) {
    try {
        const decoded = jwtVerfiy(req.headers.token)
        req.user = {
            id: decoded.id,
            email: decoded.email,
            fullName: decoded.fullName
        }
        next()
    }
    catch (err) {
        res.status(401).json({ message: 'unauthenticated user' })
    }
}

module.exports = Authenticate