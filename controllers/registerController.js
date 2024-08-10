const User=require('../model/User')


const handlUser=async(req,res)=>{
    if(req.method=='POST'){
        const user=req.body
        console.log(user);
        if(await User.findOne({username:user.username})){
            req.flash('error','User is existed!')
            return res.redirect('/sign-up')
           
        }
        if(user.password1!==user.password2)
            req.flash('error','Password is not match!')
            return res.redirect('sign-up')

            
      
       
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