# User Registration Endpoint

## Endpoint
`POST /users/register`

## Description
This endpoint allows a new user to register by providing their email, full name, and password. The data is validated and then saved to the database. Upon successful registration, a token and user details are returned.

## Request Body
The request body should be a JSON object containing the following fields:

- `email` (string): The user's email address. Must be a valid email format.
- `fullname` (object): An object containing the user's full name.
  - `firstname` (string): The user's first name. Must be at least 3 characters long.
  - `lastname` (string, optional): The user's last name. If provided, must be at least 3 characters long.
- `password` (string): The user's password. Must be at least 6 characters long.

### Example Request Body
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

## Response
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

### Error Responses
- **Status Code:** `400 Bad Request`
  - **Description:** This status code is returned if the request body is invalid or missing required fields.
  - **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Invalid email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "First Name must be atleast 3 characters",
          "param": "fullname.firstname",
          "location": "body"
        },
        {
          "msg": "Password must be at least 6 characters long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

## Validation Rules
- `email`: Must be a valid email format.
- `fullname.firstname`: Must be at least 3 characters long.
- `fullname.lastname`: If provided, must be at least 3 characters long.
- `password`: Must be at least 6 characters long.
