const {User} = require('../models')
const {verifyToken} = require('../helpers/jwt')

function authtentic(req, res, next){
    try {
        const user = verifyToken(req.headers.access_token)

        User.findOne({
            where: {
                email: user.email
            }
        })
            .then((data)=>{
                req.currentUser = data
                next()                
            })
            .catch(err => {
                next(err)
            })
    } catch (error) {
        next(error)
    }
}

function authtenticAdmin(req, res, next){
    if(req.currentUser.role == 'admin'){
        next()
    }else{
        next({
            name: "userCustomer",
            message: "User must be Admin"
        }) 
    }
}

function authorize(req, res, next){

}

module.exports = {
    authtentic,
    authtenticAdmin,
    authorize
}