import pkg from "jsonwebtoken";
const { verify, JsonWebTokenError } = pkg;


const isAuthenticated = async (req , res , next) =>{
    try{
        const token = req.cookies.token; //req.cookies ke andar token hota hai
        //it tries to get token from the cookie send by theh client

        //first we check if the user is authenticated or not...
        if(!token)return res.status(401).json({
            message:"User not authenticated",
            success: false,
        });

        //now we have finded the user 
        //we will verify again with the secret key in our environemnt variables 

        const decode  = await verify(token,process.env.SECRET_KEY);
        //now from here it will verify 

        if(!decode){
            return res.status(401).json({
                message:"User not authenticated",
                success: false,
            })
        }

        //now till now the token is decoded..verified

        req.id = decode.userId;

        /*
        If the token is valid, it adds the user’s ID from the token to the request object, 
        so you can use it in the next middleware or route handler.
        */

        next();

    }
    catch(error){
        console.log(error);
    }
}
export default isAuthenticated;