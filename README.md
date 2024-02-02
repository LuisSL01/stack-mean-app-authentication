NODE AUTHENTICATION API

    Api for registering users with mongo db and authentication using JWT (json web token), also this app uses passport and passport-jwt.



USAGE

    npm install
    
    npm start

ENDPOINTS

    POST /users/register

    POST /users/authenticate   //return a token

    GET /users/profile  //needs jwt to authorize

