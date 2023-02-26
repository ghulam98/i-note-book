var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodb$oy';

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    console.log("inside middleware")
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token1" })
    }
    try {
        console.log(token,"kkk")
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        console.log(data,"kkk")
        next();
    } catch (error) {
        console.log("inside CATCH")
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    console.log("END")

}
// var jwt = require('jsonwebtoken');
// const fetchuser = (req, res, next)=>{

//     //get the user from jwt token  and add id to req object
//     const token = req.header('auth-token') 

//     if(!token){
//         return res.status(401).send({error:"please pass token in header."})
//     }
//     try {
//         //niw time to verify our =secrate key with token
//         const data = jwt.verify(token, 'ITsKEY' )
//         console.log("varify", data)
//         req.user = data.user
//         next();
//     } catch (error) {
//         return res.status(401).send({error:"Plz provide valid token."})
        
//     }


    
// } 


module.exports = fetchuser;
