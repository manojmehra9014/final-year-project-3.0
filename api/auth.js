const jwt = require("jsonwebtoken");
const app1 = require("../backend/app");

const auth = async (req , res , next ) =>{
    try{
        const token = req.cookies.jwt;
        if (!token) {
            // Token not found, proceed to the next middleware or route handler
            return next();
          }
          else{

              const verifyuser = jwt.verify(token , 'shhhh');
              if(verifyuser){
                  return res.redirect("/gettingstart")
                }
            }
    }
    catch(error){
        res.status(401).send(error);
    }
}



module.exports = auth;

