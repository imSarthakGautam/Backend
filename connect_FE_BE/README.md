## Using Axios to send request from FE
```
npm i axios
```

Axios is a versatile and efficient javascript library used to make HTTP requests to server.

It provides a simple and elegant interface for sending requests and handling responses, making it a valuable tool for building web applications and interacting with APIs.

**Common use Cases:**
- Fetching data from APIs: Axios is ideal for retrieving data from RESTful APIs.
- Sending form data: You can easily send form data to servers using Axios.
- File uploads: Axios supports file uploads, making it suitable for image or document uploads.
- Authentication: Implement authentication mechanisms like token-based authentication using Axios interceptors.
- Error handling: Axios provides built-in error handling mechanisms to manage network errors and server-side errors.

## CORS

**CORS (Cross-Origin Resource Sharing)** is a security mechanism implemented by web browsers to prevent malicious requests from different origins (domains, protocols, ports). 

When a frontend (FE) application attempts to make a request to a backend (BE) server on a different origin, CORS restrictions can come into play.

- **Different Origins:** different domains, protocols (http and https), different ports.

### Solutions
1. Configuring Backend : whitelisting
- Allow all origins
- specified allowed origins

2. Using CORS proxy

3. Modify frontend
- using CORS-enabled library like Axios or fetch
-set up server-side proxy on FE to handle CORS operation

 #### Using Proxies in vite
 > vite.config.js
 ```javascript
 export default defineConfig({
  server :{
    proxy:{
      'api':'http://localhost:3000',
      },
  },
  
  plugins: [react()],
})
 ```
 `'api':'http://localhost:3000'`: This configuration tells Vite to proxy the requests to the /api path to the specified URL (`http://localhost:3000`). This means that any requests made to `/api` in your frontend code will be forwarded to the backend server running on `http://localhost:3000`.

 if in production change localhost to hosting site.






