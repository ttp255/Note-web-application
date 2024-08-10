const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const User=require('../model/User')
require('dotenv').config()

const handleLogin=async(req,res)=>{
    if (req.method=='POST'){
        const {username,password}=req.body
        // console.log(username,password);
        const foundUser=await User.findOne({username})
        if(!foundUser){
           req.flash('error','User is not existed!')
           return res.redirect('/sign-in')
        }
        
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
            
            
        }else{
            
           

            // res.render('login',message)
         
            req.flash('error','Password is wrong!')
            
            return res.redirect('/sign-in')
                
            
        
            
            
        }
        
            
    }
    
    
}
const loginPage=(req,res)=>{
    res.render('login.ejs')
}

module.exports={handleLogin,loginPage}