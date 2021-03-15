const jwt = require('jsonwebtoken')

const secretKey = process.env.SECRET_KEY

function createToken(user){
    var token = jwt.sign({
        id: user.id,
        email: user.email,
        role: user.role
    }, secretKey)

    return token    
}

function verifyToken(token){
    var decoded = jwt.verify(token, secretKey)
    return decoded
}

module.exports = {
    createToken,
    verifyToken
}