const {User} = require('../models')
const {hashPassword, comparedPassword} = require('../helpers/bcrypt')
const {createToken} = require('../helpers/jwt')

class UserController{
    static async login(req, res, next){
        try {
            const {email, password} = req.body
            const user = await User.findOne({
                    where: {
                        email
                    }
                })
                // console.log(user)
                if(!user){
                    throw {msg: "Invalid Email or Password"}
                }
                if(!comparedPassword(password, user.password)){
                    throw {msg: "Invalid Email or Password"}
                }
                const access_token = createToken(user)
                console.log(access_token)
                res.status(200).json({access_token})
        } catch (error) {
            next(error)
        }
    }   
}

module.exports = UserController