import axios from "axios"
// Importing Axios library
// Axios is used to make HTTP requests to backend APIs



const API = axios.create({

    // Base URL for all API requests
    // Instead of writing full URL every time,
    // Axios automatically adds this base URL

    baseURL: "http://127.0.0.1:8000",
    headers:{
        'Content-Type':'application/json'
    },
    timeout :5000,

});



/*
|--------------------------------------------------------------------------
| REQUEST INTERCEPTOR
|--------------------------------------------------------------------------
|
| Interceptors run BEFORE every request is sent.
|
| Purpose:
| Automatically attach JWT token to every protected request.
|
| Real-time example:
|
| Frontend Request
|        ↓
| Interceptor adds token
|        ↓
| Backend verifies token
|        ↓
| Access granted
|
*/



API.interceptors.request.use((config) => {

    // config contains current request information
    // Example:
    //
    // {
    //    method: "GET",
    //    url: "/products",
    //    headers: {}
    // }

    

    // Getting token from browser localStorage
    // Token was usually stored after login

    const token = localStorage.getItem("token");
console.log("token sent",token)


    // If token exists
    // attach Authorization header

    if (token) {

        config.headers.Authorization = `Bearer ${token}`;

        // Final header becomes:
        //
        // Authorization: Bearer eyJhbGciOi...
    }



    // VERY IMPORTANT:
    // Must return config
    // otherwise request will stop

    return config;

});



/*
|--------------------------------------------------------------------------
| EXPORT API INSTANCE
|--------------------------------------------------------------------------
|
| Makes this API instance reusable across entire application
|
| Example usage:
|
| API.get("/products")
| API.post("/login", data)
|
*/

export default API;