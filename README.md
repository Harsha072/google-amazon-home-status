
# Status Check API

This is a Node.js server built with Express.js for checking the status of popular websites (Google and Amazon). It provides the websites' statuses, response time, and timestamps in JSON format.

## Features
- **Endpoint for Google status**: `/v1/google-status`
- **Endpoint for Amazon status**: `/v1/amazon-status`
- **Combined status of both Google and Amazon**: `/v1/all-status`
- **JSON response** with URL, status code, response time, and timestamp
- **CORS** enabled for cross-origin resource sharing with a specified Angular frontend

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/my-node-server.git
   cd my-node-server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm run dev 
   ```
   The server will run on `http://localhost:3000`.

4. **Development mode with hot-reloading**:
   For development, use Nodemon to restart the server automatically on changes:
   ```bash
   npm install -g nodemon
   nodemon index.js
   ```

## API Endpoints

### 1. `/v1/google-status`
- **Description**: Fetches the status of Google.
- **Method**: `GET`
- **Response Example**:
  ```json
  {
    "url": "https://www.google.com",
    "statusCode": 200,
    "duration": 152,
    "date": 1695000000
  }
  ```

### 2. `/v1/amazon-status`
- **Description**: Fetches the status of Amazon.
- **Method**: `GET`
- **Response Example**:
  ```json
  {
    "url": "https://www.amazon.com",
    "statusCode": 200,
    "duration": 300,
    "date": 1695000000
  }
  ```

### 3. `/v1/all-status`
- **Description**: Fetches the statuses of both Google and Amazon simultaneously.
- **Method**: `GET`
- **Response Example**:
  ```json
  [
    {
      "url": "https://www.google.com",
      "statusCode": 200,
      "duration": 150,
      "date": 1695000000
    },
    {
      "url": "https://www.amazon.com",
      "statusCode": 200,
      "duration": 300,
      "date": 1695000000
    }
  ]
  ```
## How to run testcases
 ```bash
   npm run test
   ```
## How to Test the API

You can test the API using:
- **Browser**: Visit `http://localhost:3000/v1/google-status`, `http://localhost:3000/v1/amazon-status`, or `http://localhost:3000/v1/all-status`.
- **Postman**: Make GET requests to the same URLs to see the status data.
- **cURL**: Use `curl` commands to check the statuses:
  ```bash
  curl http://localhost:3000/v1/google-status
  curl http://localhost:3000/v1/amazon-status
  curl http://localhost:3000/v1/all-status
  ```

## Dependencies
- **Node.js**: JavaScript runtime environment
- **Express.js**: Fast web framework for Node.js
- **Axios**: Promise-based HTTP client for the browser and Node.js
- **CORS**: Middleware for handling cross-origin resource sharing

## License
This project is licensed under the MIT License.
