function errorHandler(err, req, res, next){
    if(err.msg){
        let errors = []
        errors.push(err.msg)
        res.status(400).json({errors})
    }
    if(err.message){
        let errors = []
        errors.push(err.message)
        res.status(400).json({errors})
    }
    if(err.errors){
        let errors = err.errors.map(el=>{
            return el.message
        })
        res.status(400).json({errors})
    }
    // res.status(400).json({message: err.errors[0].message})
    
}

module.exports = errorHandler