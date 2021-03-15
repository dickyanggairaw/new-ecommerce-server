const request = require('supertest')
const app = require('../app.js')

describe("testing POST /login", function(){
    //success
    describe("Succes Login Admin", ()=>{
        it("should return response with status 200", function(done){
            const body = {
                email: "admin@mail.com",
                password: "apaan"
            }
    
            request(app)
                .post('/login')
                .send(body)
                .end(function(err, res){
                    if (err) {
                        done(err)
                    }else{
                        expect(res.statusCode).toEqual(200)
                        expect(typeof res.body).toEqual('object')
                        expect(res.body).toHaveProperty('access_token')
    
                        done()
                    }
                })
        })
    })   

    //fail
    describe("Fail Login Admin", ()=>{
        it("should return response with status 400", function(done){
            const body = {
                email: "admin@mail.com",
                password: "kurang",
            }
    
            request(app)
                .post('/login')
                .send(body)
                .end(function(err, res){
                    if (err) {
                        done(err)
                    }else{
                        expect(res.statusCode).toEqual(400)
                        expect(typeof res.body).toEqual('object')
                        expect(res.body).toHaveProperty('errors')
                        expect(Array.isArray(res.body.errors)).toEqual(true)
                        expect(res.body.errors).toEqual(
                            expect.arrayContaining(["Invalid Email or Password"])
                        )  
    
    
                        done()
                    }
                })
        })
        it("should return response with status 400", function(done){
            const body = {
                email: "adming@mail.com",
                password: "apaan",
            }
    
            request(app)
                .post('/login')
                .send(body)
                .end(function(err, res){
                    if (err) {
                        done(err)
                    }else{
                        expect(res.statusCode).toEqual(400)
                        expect(typeof res.body).toEqual('object')
                        expect(res.body).toHaveProperty('errors')
                        expect(Array.isArray(res.body.errors)).toEqual(true)
                        expect(res.body.errors).toEqual(
                            expect.arrayContaining(["Invalid Email or Password"])
                        )
    
                        done()
                    }
                })
        })
        it("should return response with status 400", function(done){
            const body = {
                email: "",
                password: "",
            }
    
            request(app)
                .post('/login')
                .send(body)
                .end(function(err, res){
                    if (err) {
                        done(err)
                    }else{
                        expect(res.statusCode).toEqual(400)
                        expect(typeof res.body).toEqual('object')
                        expect(res.body).toHaveProperty('errors')
                        expect(Array.isArray(res.body.errors)).toEqual(true)
                        expect(res.body.errors).toEqual(
                            expect.arrayContaining(["Invalid Email or Password"])
                        )
    
    
                        done()
                    }
                })
        })
    })

})