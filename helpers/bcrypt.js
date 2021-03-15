const bcrypt = require('bcryptjs')

function hashPassword(password){
    return bcrypt.hashSync(password, 10)
}

function comparedPassword(password, dbPassword){
    return bcrypt.compareSync(password, dbPassword)
}

module.exports = {
    hashPassword,
    comparedPassword
}