const User=require('../model/User')
const bcrypt=require('bcrypt')

const handlUser=async(req,res)=>{
    if(req.method=='POST'){
        const user=req.body
        console.log(user);
        if(!user.username ||!user.password||!user.email )return res.status(400).send({'message':"Not null!"})

        if(await User.findOne({username:user.username})){
            return res.status(409).send({'message':"Username is already existed!"})

        }
       
        const newUser=await User.create({
            username:user.username,
            password:await bcrypt.hash(user.password,10),
            email:user.email,

        })
        await newUser.save()
        return res.redirect('sign-in')

    }
    
    
}

const signUpPage=(req,res)=>{
    res.render('sign_up')
}
module.exports={signUpPage,handlUser}