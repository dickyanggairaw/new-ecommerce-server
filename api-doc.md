# E-Commerce

## POST Login /login

### Req.body:
```json
  {
    "email": "<email>",
    "password": "<password>"
  }
```

### Response (200 - OK)
```json
  {
    "access_token": "<access_token>"
  }
```

### Response (400 - Bad Request)
```json
  {
    "message": "<validation error message>"
  }
```

## POST Register /register
### Req.body
```json
  {
    "email": "<email>",
    "password": "<password>"
  }
```

### Response (201)
```json
  {
    "id": "<id>",
    "email": "<email>",
    "role": "<role>"
  }
```

### Response (400 - Bad Request)
```json
  {
    "message": "<validation error message>"
  }
```


## GET Product /products

### Req.headers:
```json
  {
    "access_token": "<acess_token>"
  }
```

### Response (200 - OK)
```json
[
  {
    "id": "<id>",
    "name": "<name>",
    "image_url": "<image_url>",
    "price": "<price>",
    "stock": "<stock>"
  }
]
```
### Response (400 - Bad Request)
```json
  {
    "errors": "<errors>"
  }
```


## POST Create Product /products

### Req.headers:
```json
  {
    "access_token": "<acess_token>"
  }
```

### Req.body:
```json
  {
    "name": "<name>",
    "image_url": "<image_url>",
    "price": "<price>",
    "stock": "<stock>"
  }
```

### Response (201 - OK)
```json
  {
    "id": "<id>",
    "name": "<name>",
    "image_url": "<image_url>",
    "price": "<price>",
    "stock": "<stock>"
  }
```

### Response (400 - Bad Request)
```json
  {
    "errors": "<errors>"
  }
```

## PUT Update Product /products/:id

### Req.headers:
```json
  {
    "access_token": "<acess_token>"
  }
```
### Req.params:
```json
  {
    "id": "<req.params.id>"
  }
```

### Req.body:
```json
  {
    "name": "<name>",
    "image_url": "<image_url>",
    "price": "<price>",
    "stock": "<stock>"
  }
```

### Response (200 - OK)
```json
  {
    "id": "<id>",
    "name": "<name>",
    "image_url": "<image_url>",
    "price": "<price>",
    "stock": "<stock>"
  }
```

### Response (400 - Bad Request)
```json
  {
    "errors": "<errors>"
  }
```

## DELETE Delete Product /products/:id

### Req.headers:
```json
  {
    "access_token": "<acess_token>"
  }
```
### Req.Params:
```json
  {
    "id": "<req.params.id>"
  }
```

### Response (200 - OK)
```json
1
```

### Response (400 - Bad Request)
```json
  {
    "errors": "<errors>"
  }
```

## Internal Server Error (500)
```json
  {"message": "<internal server error>"}
```

## POST create Cart /carts/:ProductId

### Req.headers:
```json
  {
    "access_token": "<acess_token>"
  }
```
### Req.Params:
```json
  {
    "id": "<req.params.ProductId>"
  }
```

### Response (200)
```json
  {
    "UserId": "<UserId>",
    "ProductId": "<ProdductId>",
    "stock": "<stock>"
  }
```

### Response (400 - Bad Request)
```json
  {
    "errors": "<errors>"
  }
```

## Internal Server Error (500)
```json
  {"message": "<internal server error>"}
```

## GET Cart /carts

### Req.headers:
```json
  {
    "access_token": "<acess_token>"
  }
```

### Response (200)
```json
[
  {
    "UserId": "<UserId>",
    "ProductId": "<ProdductId>",
    "stock": "<stock>",
    "Product": {
      "id": "<id>",
      "name": "<name>",
      "image_url": "<image_url>",
      "price": "<price>",
      "stock": "<stock>"
    }
  }
]
```

### Response (400 - Bad Request)
```json
  {
    "errors": "<errors>"
  }
```

## Internal Server Error (500)
```json
  {"message": "<internal server error>"}
```

## DELETE Delete Cart /carts/:id

### Req.headers:
```json
  {
    "access_token": "<acess_token>"
  }
```
### Req.Params:
```json
  {
    "id": "<req.params.id>"
  }
```

### Response (200 - OK)
```json
  {"message": "Successfully delete Product"}
```

### Response (400 - Bad Request)
```json
  {
    "errors": "<errors>"
  }
```

## Internal Server Error (500)
```json
  {"message": "<internal server error>"}
```

## PUT update Stok /carts/:id
### Req.headers:
```json
  {
    "access_token": "<acess_token>"
  }
```

### Req.Params:
```json
  {
    "id": "<req.params.id>"
  }
```

### Req.Body:
```json
  {
    "stock": "<req.body.stock>"
  }
```

### Response (200)
```json
[
  {
    "UserId": "<UserId>",
    "ProductId": "<ProdductId>",
    "stock": "<stock>",
    "Product": {
      "id": "<id>",
      "name": "<name>",
      "image_url": "<image_url>",
      "price": "<price>",
      "stock": "<stock>"
    }
  }
]
```

### Response (400 - Bad Request)
```json
  {
    "errors": "<errors>"
  }
```

## Internal Server Error (500)
```json
  {"message": "<internal server error>"}
```

## PUT Checkout /checkout
### Req.headers:
```json
  {
    "access_token": "<acess_token>"
  }
```

### Req.Params:
```json
  {
    "id": "<req.params.id>"
  }
```

### Req.Body:
```json
  {
    "id": "payload.id",
    "ProductId": "payload.ProductId",
    "stock": "payload.stock",
    "stockProduct": "payload.Product.stock",
    "name": "payload.Product.name",
    "image_url": "payload.Product.image_url",
    "price": "payload.Product.price"
  }
```
### Response 200
```json
  {
    "message": "Succesfully checkout Product"
  }
```

## POST Wishlist Create /wistlists/:ProductId
### Req.headers:
```json
  {
    "access_token": "<acess_token>"
  }
```

### Req.Params:
```json
  {
    "ProductId": "<req.params.ProductId>"
  }
```
### Response 201
```json
  {
    "id": "<id>",
    "UserId": "<UserId>",
    "ProductId": "<ProductId>"
  }
```

## GET Wistlist /wishlists
### Req.headers:
```json
  {
    "access_token": "<acess_token>"
  }
```

### Req.Body:
```json
  {
    "stock": "<req.body.stock>"
  }
```

### Response (200)
```json
[
  {
    "UserId": "<UserId>",
    "ProductId": "<ProdductId>",
    "stock": "<stock>",
    "Product": {
      "id": "<id>",
      "name": "<name>",
      "image_url": "<image_url>",
      "price": "<price>",
      "stock": "<stock>"
    }
  }
]
```

## DELETE Delete Wishlist /wishlists/:id

### Req.headers:
```json
  {
    "access_token": "<acess_token>"
  }
```
### Req.Params:
```json
  {
    "id": "<req.params.id>"
  }
```

### Response (200 - OK)
```json
  {"message": "Successfully delete Wishlist"}
```

### Response (400 - Bad Request)
```json
  {
    "errors": "<errors>"
  }
```

## GET History /histories

### Req.headers:
```json
  {
    "access_token": "<acess_token>"
  }
```

### Response (200 - OK)
```json
[
  {
    "id": "<id>",
    "UserId": "<UserId>",
    "name": "<name>",
    "image_url": "<image_url>",
    "price": "<price>",
    "stock": "<stock>",
    "createdAt": "<createdAt>"
  }
]
```
### Response (400 - Bad Request)
```json
  {
    "errors": "<errors>"
  }
```