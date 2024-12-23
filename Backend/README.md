# User Endpoints

## Registration

### Endpoint
`POST /users/register`

### Description
Register a new user by providing email, full name, and password. Returns a token and user details upon success.

### Request Body
```json
{
  "email": "example@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "password123"
}
```

### Success Response
- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "generatedAuthToken",
    "user": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "example@example.com",
      "password": "hashedPassword"
    }
  }
  ```

### Error Response
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      { "msg": "Invalid email", "param": "email", "location": "body" },
      { "msg": "First Name must be atleast 3 characters", "param": "fullname.firstname", "location": "body" },
      { "msg": "Password must be at least 6 characters long", "param": "password", "location": "body" }
    ]
  }
  ```

### Validation Rules
- `email`: Valid email format.
- `fullname.firstname`: At least 3 characters.
- `fullname.lastname`: Optional, at least 3 characters if provided.
- `password`: At least 6 characters.

## Login

### Endpoint
`POST /users/login`

### Description
Log in a user by providing email and password. Returns a token and user details upon success.

### Request Body
```json
{
  "email": "example@example.com",
  "password": "password123"
}
```

### Success Response
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "token": "generatedAuthToken",
    "user": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "example@example.com"
    }
  }
  ```

### Error Responses
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      { "msg": "Invalid email", "param": "email", "location": "body" },
      { "msg": "Password must be at least 6 characters long", "param": "password", "location": "body" }
    ]
  }
  ```
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

### Validation Rules
- `email`: Valid email format.
- `password`: At least 6 characters.

## Profile

### Endpoint
`GET /users/profile`

### Description
Get the profile of the authenticated user.

### Request Headers
- `Authorization`: Bearer token

### Success Response
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "user": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "example@example.com"
    }
  }
  ```

### Error Response
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "unauthorized"
  }
  ```

## Logout

### Endpoint
`GET /users/logout`

### Description
Log out the authenticated user by invalidating the token.

### Request Headers
- `Authorization`: Bearer token

### Success Response
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Logged out"
  }
  ```

### Error Response
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "unauthorized"
  }
  ```
