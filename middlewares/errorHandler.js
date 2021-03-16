function errorHandler(err, req, res, next){
    if(err.errors){
        let errors = err.errors.map(el=>{
            return el.message
        })
        res.status(400).json({errors})
    }else
    if(err.msg){
        let errors = []
        errors.push(err.msg)
        res.status(400).json({errors})
    }else
    if(err.message){
        let errors = []
        errors.push(err.message)
        res.status(400).json({errors})
    }else{
        res.status(500).json({message: "Internal server error"})
    }
    
}

module.exports = errorHandler