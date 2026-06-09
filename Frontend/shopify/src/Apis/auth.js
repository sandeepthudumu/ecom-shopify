// Importing custom Axios instance
// This API instance already contains:
// 1. baseURL
// 2. interceptor
// 3. token handling logic
import API from "./axios";



// ===============================
// USER REGISTRATION FUNCTION
// ===============================

// This function is used to register a new user
// It accepts user data from frontend form
// Example:
// {
//   username: "sandeep",
//   email: "sandeep@gmail.com",
//   password: "123456"
// }

export const registerUser = (userData) => {

    // Sending POST request to FastAPI backend
    // Endpoint:
    // POST /auth/register
    //
    // API.post(url, data)
    //
    // userData becomes request body
    // Backend receives and stores user in database

    return API.post('/auth/register', userData);
};



// ===============================
// USER LOGIN FUNCTION
// ===============================

// This function handles login authentication
// It accepts:
// 1. username
// 2. password

export const loginUser = (username, password) => {

    // Creating form data object
    //
    // FastAPI OAuth2PasswordRequestForm
    // expects data in:
    // application/x-www-form-urlencoded
    //
    // NOT JSON
    //
    // URLSearchParams converts data like:
    //
    // {
    //   username: "sandeep",
    //   password: "123"
    // }
    //
    // into:
    //
    // username=sandeep&password=123

    const formData = new URLSearchParams();



    // Adding username field
    // formData now contains:
    // username=sandeep

    formData.append("username", username);



    // Adding password field
    // formData now contains:
    // username=sandeep&password=123

    formData.append("password", password);



    // Sending login request to backend
    //
    // Endpoint:
    // POST /auth/token
    //
    // FastAPI verifies:
    // 1. username
    // 2. password
    //
    // If valid:
    // Backend returns JWT token

    return API.post("/auth/token", formData, {

        // Setting request header
        //
        // Tells backend:
        // "This request contains form data"
        //
        // Required for OAuth2PasswordRequestForm

        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};