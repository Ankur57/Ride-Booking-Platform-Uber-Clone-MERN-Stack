# MERN Backend

## API Documentation

### Register User

It provides user registration functionality via the `/user/register` route and uses Mongoose for data modeling. 

- **Method:** POST
- **URL:** `/user/register`
- **Request Body:** JSON object with the following fields:
  - `name` (string, required)
  - `email` (string, required, must be unique)

#### Example Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```
#### Example Successful Response

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "name": "John Doe",
    "email": "john@example.com"
    // other user fields
  }
}
```
#### Response Status Codes

- `201 Created` – User registered successfully
- `400 Bad Request` – Validation error (missing/invalid data)
- `500 Internal Server Error` – Server/database issue

---

### Login User

Allows a registered user to log in via the `/user/login` route.

- **Method:** POST
- **URL:** `/user/login`
- **Request Body:** JSON object with the following fields:
  - `email` (string, required)

#### Example Request Body

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

#### Example Successful Response

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com"
    // other user fields
  }
}
```

#### Response Status Codes

- `200 OK` – Login successful, returns JWT token and user info
- `400 Bad Request` – Validation error (missing/invalid data)
- `401 Unauthorized` – Invalid credentials
- `500 Internal Server Error` – Server/database issue

---

### Get User Profile

Returns the authenticated user's profile information.

- **Method:** GET
- **URL:** `/user/profile`
- **Headers:**  
  - `Cookie: token=jwt_token_here`  
  or  
  - `Authorization: Bearer jwt_token_here`
- **Authentication:** Required (JWT token)

#### Example Successful Response

```json
{
  "_id": "user_id_here",
  "firstname": "John",
  "lastname": "Doe",
  "email": "john@example.com"
  // other user fields
}
```

#### Response Status Codes

- `200 OK` – Profile retrieved successfully
- `401 Unauthorized` – Invalid or missing JWT token
- `500 Internal Server Error` – Server/database issue

### Register Captain

Registers a new captain (driver) with vehicle details.

- **Method:** POST  
- **URL:** `/captain/register`
- **Request Body:** JSON object with the following fields:
  - `fullname` (object, required)
    - `firstname` (string, required, min 3 chars)
    - `lastname` (string, optional, min 3 chars)
  - `email` (string, required, must be unique and valid email)
  - `password` (string, required, min 6 chars)
  - `vehicle` (object, required)
    - `color` (string, required, min 3 chars)
    - `plate` (string, required, min 3 chars)
    - `capacity` (integer, required, min 1)
    - `vehicleType` (string, required, one of: `car`, `motorcycle`, `auto`)

#### Example Request Body

```json
{
  "fullname": {
    "firstname": "Amit",
    "lastname": "Sharma"
  },
  "email": "amit.captain@example.com",
  "password": "strongpassword",
  "vehicle": {
    "color": "Red",
    "plate": "AB1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Example Successful Response

```json
{
  "message": "Captain registered successfully"
}
```

#### Response Status Codes

- `201 Created` – Captain registered successfully
- `400 Bad Request` – Validation error or captain already exists
- `500 Internal Server Error` – Server/database issue

---

### Login Captain

Authenticates a captain and returns a JWT token.

- **Method:** POST  
- **URL:** `/captain/login`
- **Request Body:** JSON object with the following fields:
  - `email` (string, required)
  - `password` (string, required, min 6 chars)

#### Example Request Body

```json
{
  "email": "amit.captain@example.com",
  "password": "strongpassword"
}
```

#### Example Successful Response

```json
{
  "token": "jwt_token_here",
  "captain": {
    "_id": "captain_id_here",
    "fullname": {
      "firstname": "Amit",
      "lastname": "Sharma"
    },
    "email": "amit.captain@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Red",
      "plate": "AB1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "ltd": null,
      "lng": null
    }
    // other captain fields
  }
}
```

#### Response Status Codes

- `200 OK` – Login successful, returns JWT token and captain info
- `400 Bad Request` – Validation error or incorrect password
- `401 Unauthorized` – Captain not found
- `500 Internal Server Error` –

### Get Captain Profile

Returns the authenticated captain's profile information.

- **Method:** GET  
- **URL:** `/captain/profile`
- **Headers:**  
  - `Cookie: token=jwt_token_here`  
  or  
  - `Authorization: Bearer jwt_token_here`
- **Authentication:** Required (JWT token)

#### Example Successful Response

```json
{
  "captain": {
    "_id": "captain_id_here",
    "fullname": {
      "firstname": "Amit",
      "lastname": "Sharma"
    },
    "email": "amit.captain@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Red",
      "plate": "AB1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "ltd": null,
      "lng": null
    }
    // other captain fields
  }
}
```

#### Response Status Codes

- `200 OK` – Profile retrieved successfully
- `401 Unauthorized` – Invalid or missing JWT token
- `500 Internal Server Error` – Server/database issue

### Logout Captain

Logs out the authenticated captain by blacklisting the JWT token and clearing the authentication cookie.

- **Method:** GET  
- **URL:** `/captain/logout`
- **Headers:**  
  - `Cookie: token=jwt_token_here`  
  or  
  - `Authorization: Bearer jwt_token_here`
- **Authentication:** Required (JWT token)

#### Example Successful Response

```json
{
  "message": "Captain logged out successfully "
}
```

#### Response Status Codes

- `200 OK` – Captain logged out successfully
- `401 Unauthorized` – Invalid or missing JWT token
- `500 Internal Server Error

