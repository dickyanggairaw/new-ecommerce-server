const request = require('supertest')
const app = require('../app.js')
const {User} = require('../models')
const {createToken, verifyToken} = require('../helpers/jwt')

describe("testing POST /products", function(){
    describe("Succes create Product", ()=>{
        let token = ''
        beforeAll(()=>{
            user = {
                id: 1,
                email: 'admin@mail.com',
                role: 'admin'
            }
            token = createToken(user)
        })
        it("should return response with status 201", function(done){
            const body = {
                name: "rebook",
                image_url: "https://www.zappos.com/product/9454059/color/889166?utm_medium=fpa&utm_campaign=free_listings",
                price: 100000,
                stock: 10
            }
    
            request(app)
                .post('/products')
                .set('access_token', token)
                .send(body)
                .end(function(err, res){
                    if (err) {
                        done(err)
                    }else{
                        expect(res.statusCode).toEqual(201)
                        expect(typeof res.body).toEqual('object')
                        expect(res.body).toHaveProperty('id')
                        expect(typeof res.body.id).toEqual('number')
                        expect(res.body).toHaveProperty('name', body.name)
                        expect(res.body).toHaveProperty('image_url', body.image_url)
                        expect(res.body).toHaveProperty('price', body.price)
                        expect(res.body).toHaveProperty('stock', body.stock)
    
    
                        done()
                    }
                })
        })
    })

    describe("Fail create Product because token", ()=> {
        let token = ''
        beforeAll(()=>{
            user = {
                id: 2,
                email: 'customer@mail.com',
                role: 'customer'
            }
            token = createToken(user)
        })
        it("should return response with status 400", function(done){
            const body = {
                name: "rebook",
                image_url: "https://www.zappos.com/product/9454059/color/889166?utm_medium=fpa&utm_campaign=free_listings",
                price: 100000,
                stock: 10
            }
    
            request(app)
                .post('/products')
                .set('access_token', '')
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
                            expect.arrayContaining(['jwt must be provided'])
                        )     
    
                        done()
                    }
                })
        })
        it("should return response with status 400", function(done){
            const body = {
                name: "rebook",
                image_url: "https://www.zappos.com/product/9454059/color/889166?utm_medium=fpa&utm_campaign=free_listings",
                price: 100000,
                stock: 10
            }
    
            request(app)
                .post('/products')
                .set('access_token', token)
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
                            expect.arrayContaining(['User must be Admin'])
                        )     
    
                        done()
                    }
                })
        })
    })
    describe("Fail create Product because validate", ()=>{
        let token = ''
        beforeAll(()=>{
            user = {
                id: 1,
                email: 'admin@mail.com',
                role: 'admin'
            }
            token = createToken(user)
        })
        it("should return response with status 400", function(done){
            const body = {
                name: "",
                image_url: "https://www.zappos.com/product/9454059/color/889166?utm_medium=fpa&utm_campaign=free_listings",
                price: 100000,
                stock: 10
            }
    
            request(app)
                .post('/products')
                .set('access_token', token)
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
                            expect.arrayContaining([ "Name is required"])
                        )      
    
                        done()
                    }
                })
        })
        it("should return response with status 400", function(done){
            const body = {
                name: "rebook",
                image_url: "https://www.zappos.com/product/9454059/color/889166?utm_medium=fpa&utm_campaign=free_listings",
                price: 100000,
                stock: -1
            }
    
            request(app)
                .post('/products')
                .set('access_token', token)
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
                            expect.arrayContaining([ "Validation min on stock failed"])
                        )      
    
                        done()
                    }
                })
        })
        it("should return response with status 400", function(done){
            const body = {
                name: "rebook",
                image_url: "https://www.zappos.com/product/9454059/color/889166?utm_medium=fpa&utm_campaign=free_listings",
                price: -1,
                stock: 5
            }
    
            request(app)
                .post('/products')
                .set('access_token', token)
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
                            expect.arrayContaining([ "Validation min on price failed"])
                        )     
    
                        done()
                    }
                })
        })
        it("should return response with status 400", function(done){
            const body = {
                name: "rebook",
                image_url: "https://www.zappos.com/product/9454059/color/889166?utm_medium=fpa&utm_campaign=free_listings",
                price: 100000,
                stock: 'kosong'
            }
    
            request(app)
                .post('/products')
                .set('access_token', token)
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
                            expect.arrayContaining([ 'Validation isInt on stock failed'])
                        )    
    
                        done()
                    }
                })
        })
    })
})

describe("testing PUT /products/:id", function(){
    describe("Succes update Product", ()=>{
        let token = ''
        beforeAll(()=>{
            user = {
                id: 1,
                email: 'admin@mail.com',
                role: 'admin'
            }
            token = createToken(user)
        })
        it("should return response with status 200", function(done){
            const body = {
                name: "adidas",
                image_url: "https://www.zappos.com/product/9454059/color/889166?utm_medium=fpa&utm_campaign=free_listings",
                price: 100000,
                stock: 10
            }
    
            request(app)
                .put('/products/2')
                .set('access_token', token)
                .send(body)
                .end(function(err, res){
                    if (err) {
                        done(err)
                    }else{
                        expect(res.statusCode).toEqual(200)
                        expect(typeof res.body).toEqual('object')
                        expect(res.body).toHaveProperty('id')
                        expect(typeof res.body.id).toEqual('number')
                        expect(res.body).toHaveProperty('name', body.name)
                        expect(res.body).toHaveProperty('image_url', body.image_url)
                        expect(res.body).toHaveProperty('price', body.price)
                        expect(res.body).toHaveProperty('stock', body.stock)
    
    
                        done()
                    }
                })
        })
    })
    describe("Fail update Product", ()=>{
        describe("Fail update Product because Token", ()=> {
            let token = ''
            beforeAll(()=>{
                user = {
                    id: 2,
                    email: 'customer@mail.com',
                    role: 'customer'
                }
                token = createToken(user)
            })
            it("should return response with status 400", function(done){
                const body = {
                    name: "rebook",
                    image_url: "https://www.zappos.com/product/9454059/color/889166?utm_medium=fpa&utm_campaign=free_listings",
                    price: 100000,
                    stock: 10
                }
        
                request(app)
                    .put('/products/4')
                    .set('access_token', '')
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
                                expect.arrayContaining(['jwt must be provided'])
                            )     
        
                            done()
                        }
                    })
            })
            it("should return response with status 400", function(done){
                const body = {
                    name: "rebook",
                    image_url: "https://www.zappos.com/product/9454059/color/889166?utm_medium=fpa&utm_campaign=free_listings",
                    price: 100000,
                    stock: 10
                }
        
                request(app)
                    .put('/products/4')
                    .set('access_token', token)
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
                                expect.arrayContaining(['User must be Admin'])
                            )     
        
                            done()
                        }
                    })
            })
        })
        describe("Fail update Product because validate", ()=>{
            let token = ''
            beforeAll(()=>{
                user = {
                    id: 1,
                    email: 'admin@mail.com',
                    role: 'admin'
                }
                token = createToken(user)
            })
            it("should return response with status 400", function(done){
                const body = {
                    name: "rebook",
                    image_url: "https://www.zappos.com/product/9454059/color/889166?utm_medium=fpa&utm_campaign=free_listings",
                    price: 100000,
                    stock: -1
                }
        
                request(app)
                    .put('/products/4')
                    .set('access_token', token)
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
                                expect.arrayContaining([ "Validation min on stock failed"])
                            )      
        
                            done()
                        }
                    })
            })
            it("should return response with status 400", function(done){
                const body = {
                    name: "rebook",
                    image_url: "https://www.zappos.com/product/9454059/color/889166?utm_medium=fpa&utm_campaign=free_listings",
                    price: -1,
                    stock: 5
                }
        
                request(app)
                    .put('/products/4')
                    .set('access_token', token)
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
                                expect.arrayContaining([ "Validation min on price failed"])
                            )     
        
                            done()
                        }
                    })
            })
            it("should return response with status 400", function(done){
                const body = {
                    name: "rebook",
                    image_url: "https://www.zappos.com/product/9454059/color/889166?utm_medium=fpa&utm_campaign=free_listings",
                    price: 100000,
                    stock: 'kosong'
                }
        
                request(app)
                    .put('/products/4')
                    .set('access_token', token)
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
                                expect.arrayContaining([ 'Validation isInt on stock failed'])
                            )    
        
                            done()
                        }
                    })
            })
        })
    })
})

describe("testing DELETE /products/:id", function(){
    describe("Success delete Product", ()=>{
        let token = ''
        beforeAll(()=>{
            user = {
                id: 1,
                email: 'admin@mail.com',
                role: 'admin'
            }
            token = createToken(user)
        })
        it("should return response with status 200", function(done){
    
            request(app)
                .delete('/products/2')
                .set('access_token', token)
                .end(function(err, res){
                    if (err) {
                        done(err)
                    }else{
                        expect(res.statusCode).toEqual(200)
                        expect(typeof res.body).toEqual('number')
                        expect(res.body).toEqual(1)
    
    
                        done()
                    }
                })
        })
    })
    describe("Fail delete Product because Token", ()=> {
        let token = ''
        beforeAll(()=>{
            user = {
                id: 2,
                email: 'customer@mail.com',
                role: 'customer'
            }
            token = createToken(user)
        })
        it("should return response with status 400", function(done){
            request(app)
                .delete('/products/4')
                .set('access_token', '')
                .end(function(err, res){
                    if (err) {
                        done(err)
                    }else{
                        expect(res.statusCode).toEqual(400)
                        expect(typeof res.body).toEqual('object')
                        expect(res.body).toHaveProperty('errors')
                        expect(Array.isArray(res.body.errors)).toEqual(true)
                        expect(res.body.errors).toEqual(
                            expect.arrayContaining(['jwt must be provided'])
                        )     
    
                        done()
                    }
                })
        })
        it("should return response with status 400", function(done){
    
            request(app)
                .put('/products/4')
                .set('access_token', token)
                .end(function(err, res){
                    if (err) {
                        done(err)
                    }else{
                        expect(res.statusCode).toEqual(400)
                        expect(typeof res.body).toEqual('object')
                        expect(res.body).toHaveProperty('errors')
                        expect(Array.isArray(res.body.errors)).toEqual(true)
                        expect(res.body.errors).toEqual(
                            expect.arrayContaining(['User must be Admin'])
                        )     
    
                        done()
                    }
                })
        })
    })
})

describe("testing GET /products", function(){
    describe("Success fetchAll Product", ()=>{
        let token = ''
        beforeAll(()=>{
            user = {
                id: 2,
                email: 'customer@mail.com',
                role: 'customer'
            }
            token = createToken(user)
        })
        it("should return response with status 200", function(done){
    
            request(app)
                .get('/products')
                .set('access_token', token)
                .end(function(err, res){
                    if (err) {
                        done(err)
                    }else{
                        expect(res.statusCode).toEqual(200)
                        expect(typeof res.body).toEqual('object')
                        expect(Array.isArray(res.body)).toEqual(true)
    
                        done()
                    }
                })
        })
    })
    describe("Fail FetchAll Product", ()=>{
        let token = ''
        beforeAll(()=>{
            user = {
                id: 2,
                email: 'customer@mail.com',
                role: 'customer'
            }
            token = createToken(user)
        })
        it("should return response with status 400", function(done){
            request(app)
                .get('/products')
                .set('access_token', '')
                .end(function(err, res){
                    if (err) {
                        done(err)
                    }else{
                        expect(res.statusCode).toEqual(400)
                        expect(typeof res.body).toEqual('object')
                        expect(res.body).toHaveProperty('errors')
                        expect(Array.isArray(res.body.errors)).toEqual(true)
                        expect(res.body.errors).toEqual(
                            expect.arrayContaining(['jwt must be provided'])
                        )     
    
                        done()
                    }
                })
        })
    })
    
})