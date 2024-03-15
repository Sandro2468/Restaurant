## Available Endpoints

- `POST` /register
- `POST` /login
- `POST` /google-login
- `GET` /users
- `GET` /users/:id
- `GET` /menus
- `GET` /menus/:id
- `DELETE` /menus/:id
- `GET` /orders
- `POST` /ordersPayment/:id
- `PATCH` /updatePayment/:id

## `POST` /register

This endpoint is used to register a new user in the system.

### Request

- Method: POST
- Endpoint: /register
- Body:

```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "password": "string",
  "role": "string"
}
```

### Response

_201 - Created_

- Body:
```json
{
  "message": "User has been created"
}
```
_400 - Bad Request_
```json
{
  "message": "Validation error: The username must be unique"
}
OR
{
  "message": "Validation error: The username is required"
}
OR
{
  "message": "Validation error: The email must be unique"
}
OR
{
  "message": "Validation error: The email is required"
}
OR
{
  "message": "Validation error: Invalid email format"
}
OR
{
  "message": "Validation error: The password is required"
}
```
_500 - Internal Server Error_

```json
{
  "message": "Internal server error, try again later"
}
```


## `POST` /login

This endpoint is used to authenticate and login a user.

### Request

- Method: POST
- Endpoint: /login
- Body:

```json
{
  "email": "string",
  "password": "string"
}
```

## Response
_201 - Created_

- Body:
```json
{
  "access_token": "string",
  "id": "string",
  "name": "string",
  "email": "string",
  "role": "string"
}
```

_401 - Unauthorized_

```json
{
  "message": "Invalid username/email"
}
OR
{
  "message": "Wrong Password!"
}
```

500 - Internal Server Error

```json
{
  "message": "Internal server error, try again later"
}
```

## `POST` /google-login

This endpoint is used to authenticate and login a user using Google OAuth.

### Request

- Method: POST
- Endpoint: /google-login
- Headers:
  - google_token: "string" (Google OAuth token)
- Response

_200 - OK_

- Body:

```json
{
  "access_token": "string"
}
```

_500 - Internal Server Error_

```json

{
  "message": "Internal server error, try again later"
}
```

## `GET` /users

This endpoint is used to retrieve information about all users.

### Request

- Method: GET
- Endpoint: /users

### Response

_200 - OK_

- Body:

```json
[
  {
    "id": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "role": "string"
  },
  {
    "id": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "role": "string"
  }
]
```

_500 - Internal Server Error_

```json
{
  "message": "Internal server error, try again later"
}
```

## `GET` /users/:id

This endpoint is used to retrieve information about a specific user by their ID.

### Request

- Method: GET
- Endpoint: /users/:id

### Response

_200 - OK_

- Body:

```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "phone": "string",
  "role": "string"
}
```

_404 - Not Found_

```json
{
  "message": "User not found!"
}
```

500 - Internal Server Error

```json
{
  "message": "Internal server error, try again later"
}
```

## `GET` /menus

This endpoint is used to retrieve information about all menus.

### Request

- Method: GET
- Endpoint: /menus

### Response

_200 - OK_

- Body:

```json
[
  {
    "id": "string",
    "name": "string",
    "itemImage": "string",
    "description": "string",
    "price": "number",
    "category": "string",
    "sku": "string",
    "itemStock": "number",
    "availability": "string",
    "Orders": [
      {
        "id": "string",
        "orderTime": "string",
        "quantity": "number",
        "totalCost": "number",
        "UserId": "string",
        "MenuId": "string"
      }
    ]
  }
]
```
_500 - Internal Server Error_

```json
{
  "message": "Internal server error, try again later"
}
```


## `GET` /menus/:id

This endpoint is used to retrieve information about a specific menu by its ID.

### Request

- Method: GET
- Endpoint: /menus/:id

### Response

_200 - OK_

- Body:

```json
{
  "id": "string",
  "name": "string",
  "itemImage": "string",
  "description": "string",
  "price": "number",
  "category": "string",
  "sku": "string",
  "itemStock": "number",
  "availability": "string",
  "Orders": [
    {
      "id": "string",
      "orderTime": "string",
      "quantity": "number",
      "totalCost": "number",
      "UserId": "string",
      "MenuId": "string"
    }
  ]
}
```

_404 - Not Found_

```json
{
  "message": "Menu not found!"
}
```
500 - Internal Server Error

```json
{
  "message": "Internal server error, try again later"
}
```

## `DELETE` /menus/:id

This endpoint is used to delete a menu by its ID.

### Request

- Method: DELETE
- Endpoint: /menus/:id

### Response

_200 - OK_

- Body:

```json
{
  "message": "Menu successfully deleted"
}
```

_404 - Not Found_

```json
{
  "message": "Menu not found!"
}
```


500 - Internal Server Error

```json
{
  "message": "Internal server error, try again later"
}
```

## `GET` /orders

This endpoint is used to retrieve information about all orders.

### Request

- Method: GET
- Endpoint: /orders

### Response

_200 - OK_

- Body:

```json
[
  {
    "id": "string",
    "orderTime": "string",
    "quantity": "number",
    "totalCost": "number",
    "UserId": "string",
    "MenuId": "string",
    "Menu": {
      "id": "string",
      "name": "string",
      "itemImage": "string",
      "description": "string",
      "price": "number",
      "category": "string",
      "sku": "string",
      "itemStock": "number",
      "availability": "string"
    }
  }
]
```

_500 - Internal Server Error_

```json
{
  "message": "Internal server error, try again later"
}
```

## `POST` /ordersPayment/:id

This endpoint is used to place an order and proceed with the payment for a specific menu.

### Request

- Method: POST
- Endpoint: /ordersPayment/:id
- Body:

```json
{
  "quantity": "number"
}
```

### Response
_200 - OK_
- Body:

```json
{
  "token": "string"
}
```

_402 - Payment Required_
```json
{
  "message": "Payment is not enough!"
}
```

_404 - Not Found_

```json
{
  "message": "Menu not found!"
}
```
_500 - Internal Server Error_

```json
{
  "message": "Internal server error, try again later"
}
```


## `PATCH` /updatePayment/:id

This endpoint is used to update the payment status for a specific order.

### Request

- Method: PATCH
- Endpoint: /updatePayment/:id
- Body:

```json
{
  "orderId": "string",
  "transactionStatus": "string"
}
```

### Response
_200 - OK_
- Body:
```json
{
  "message": "Payment status updated successfully"
}
```

_404 - Not Found_

```json

{
  "message": "Order not found!"
}
```
_500 - Internal Server Error_

```json

{
  "message": "Internal server error, try again later"
}
```