const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const jwt = require('jsonwebtoken')

var bodyParser = require('body-parser')


 

app
.use(bodyParser.json())

.get('/resend',(req,res)=>{
    const newotp = Math.floor(1000 + Math.random() * 9000);
    res.status(200).json({
        newotp
    })
})
.post('/login',(req,res)=>{
    
    const otp = req.body.otp
    
    if(!otp){
       return res.status(422).json({error:"enter otp"})
    }
    
    if(otp == '1964'){
        const token = jwt.sign({id:Math.floor(Math.random() * 100)},JWT_SECRET)
        res.json({token})
    }
        
    else{
        return  res.status(200).json({error:"invalid otp"}) 
        }
    })
    

    if(process.env.NODE_ENV=="production"){
        app.use(express.static('client/build'))
        const path = require('path')
        app.get("*",(req,res)=>{
            res.sendFile(path.resolve(__dirname,'client','build','index.html'))
        })
      }

app.listen(PORT,()=>{
    console.log('server running')
})
