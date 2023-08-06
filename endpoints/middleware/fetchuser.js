var jwt = require('jsonwebtoken');
const jwt_token = 'this is a authlogin';
;
 const fetchuser = (req, res , next)=> {
    //get the user from the jwt token and add id to id obj
    const token = req.header('auth-token');
    if(!token){
        res.send("please authenticate usng a valid token")
    }
    try{
    const data  = jwt.verify(token, jwt_token)
    req.user = data.user
    next();
}
    catch(err){
        console.log(err)
        res.send("internal server error")
    }
}
module.exports = fetchuser;