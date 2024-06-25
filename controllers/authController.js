const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const User=require('../model/User')
require('dotenv').config()

const handleLogin=async(req,res)=>{
    if (req.method=='POST'){
        const {username,password}=req.body
        // console.log(username,password);
        if(!username||!password)return res.status(400).send({'message':'User or password are required!'})
        const foundUser= await User.findOne({username})
        if(!foundUser)return res.send(401)
        const match=await bcrypt.compare(password,foundUser.password)
        
    
         if(match){
            const accessToken=jwt.sign({
                'username':foundUser.username,
                'id':foundUser._id
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'5h'}
            )
           
            foundUser.accessToken=accessToken
            await foundUser.save()
            
            res.cookie('jwt',accessToken,{httpOnly:true,maxAge:24*60*60*1000})
           
            return res.redirect('/dashboard')
            
            
        }   
        
            
    }
    
    
}
const loginPage=(req,res)=>{
     res.render('login')
}

module.exports={handleLogin,loginPage}