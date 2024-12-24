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

# Captain Endpoints

## Registration

### Endpoint
`POST /captains/register`

### Description
Register a new captain by providing email, full name, password, and vehicle details. Returns a token and captain details upon success.

### Request Body
```json
{
  "email": "example@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Success Response
- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "generatedAuthToken",
    "captain": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "example@example.com",
      "vehicle": {
        "color": "red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
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
      { "msg": "Password must be at least 6 characters long", "param": "password", "location": "body" },
      { "msg": "Vehicle color must be atleast 3 characters", "param": "vehicle.color", "location": "body" },
      { "msg": "Vehicle plate must be atleast 3 characters", "param": "vehicle.plate", "location": "body" },
      { "msg": "Vehicle capacity must be atleast 1", "param": "vehicle.capacity", "location": "body" },
      { "msg": "Invalid type of vehicle", "param": "vehicle.vehicleType", "location": "body" }
    ]
  }
  ```

### Validation Rules
- `email`: Valid email format.
- `fullname.firstname`: At least 3 characters.
- `fullname.lastname`: Optional, at least 3 characters if provided.
- `password`: At least 6 characters.
- `vehicle.color`: At least 3 characters.
- `vehicle.plate`: At least 3 characters.
- `vehicle.capacity`: At least 1.
- `vehicle.vehicleType`: Must be one of `car`, `motorcycle`, or `auto`.

## Login

### Endpoint
`POST /captains/login`

### Description
Log in a captain by providing email and password. Returns a token and captain details upon success.

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
    "captain": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "example@example.com",
      "vehicle": {
        "color": "red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
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
`GET /captains/profile`

### Description
Get the profile of the authenticated captain.

### Request Headers
- `Authorization`: Bearer token

### Success Response
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "captain": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "example@example.com",
      "vehicle": {
        "color": "red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
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
`GET /captains/logout`

### Description
Log out the authenticated captain by invalidating the token.

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
