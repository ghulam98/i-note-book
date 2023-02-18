var jwt = require('jsonwebtoken');
const fetchuser = (req, res, next)=>{

    //get the user from jwt token  and add id to req object
    const token = req.header('auth-token') 

    if(!token){
        return res.status(401).send({error:"please pass token in header."})
    }
    try {
        //niw time to verify our =secrate key with token
        const data = jwt.verify(token, 'ITsKEY' )
        req.user = data.user
        return next();
    } catch (error) {
        return res.status(401).send({error:"Plz provide valid token."})
        
    }


    
} 


module.exports = fetchuser;
