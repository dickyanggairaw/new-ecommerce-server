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