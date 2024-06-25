const User=require('../model/User')



const logout=async(req,res)=>{
    const cookies = req.cookies
    
    
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    
    const accessToken=cookies.jwt

    // Is refreshToken in db?
   await User.findOneAndUpdate({accessToken},{accessToken:''})
    // if (!foundUser) {
    //     res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    //     return res.sendStatus(204); 
    // }

    // Delete accessToken in db
    
   

    res.clearCookie('jwt', { httpOnly: true });
    return res.redirect('/')
    
}
module.exports={logout}