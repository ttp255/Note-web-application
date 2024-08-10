const jwt=require('jsonwebtoken')
require('dotenv').config()

const verifyJWT=(req,res,next)=>{
    const token=req.cookies.jwt
    
    if(!token){
        return res.redirect('sign-in')
    }
    // console.log(token)
   
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err)
                return res.redirect('sign-in')
            
            req.user=decoded.username
            req.id=decoded.id
            
            next()
            
            
        }

    )
}

module.exports=verifyJWT