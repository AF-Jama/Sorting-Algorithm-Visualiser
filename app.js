const express = require('express')
const path = require('path')

const app = express()



app.get('/',(req,res)=>{
    console.log("ENDPOINT HIT")
    return res.sendFile(__dirname + '/public/templates/index.html')
})















app.use(express.static(path.join(__dirname + '/public')))


app.listen(5850,()=>{
    console.log(`Listening on port 6000`)
})