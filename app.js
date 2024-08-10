
require('dotenv').config()

const express=require('express')
const expressLayouts=require('express-ejs-layouts')
const connectDb=require('./config/db')
const cookieParser=require('cookie-parser')
const session=require('cookie-session')
const flash=require('connect-flash')
const app=express()
const port=5000 ||process.env.PORT

//middleware

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(session({
    name:'session',
    keys:['d5b6be1f198898d375bb18b387d192d36e74b0b2e7807eb64839c2f2b1bbc1da'],
    maxAge:24*60*1000*60
}))
app.use(flash())
app.use((req,res,next)=>{
    res.locals.flashes=req.flash()
    next()
})
//static files


//template engine

app.set('view engine','ejs')

//routes

app.use(express.static('public'))
app.use('/',require('./routes/login'))
app.use('/',require('./routes/sign_up'))

app.use(expressLayouts)//
app.set('layout','./layouts/main')//set layout
app.use('/',require('./routes/index'))
app.use('/',require('./routes/logout'))

app.use(require('./middleware/verifyJWT'))

app.use('/',require('./routes/dashboard'))
app.use(require('./routes/notfound'))

//run app
app.listen(port,(req,res)=>{
    console.log(`App run on port ${port}`)
    connectDb()
    

})
