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
                if(data.role == 'admin'){
                    next()
                }else{
                    next({
                        name: "userCustomer",
                        message: "User must be Admin"
                    }) 
                }
                
            })
            .catch(err => {
                next({
                    name: "userCustomer",
                    message: "User must be Admin"
                })
            })
    } catch (error) {
        next(error)
    }
}

function authorize(req, res, next){

}

module.exports = {
    authtentic,
    authorize
}