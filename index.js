const express=require('express')
const { resume } = require('./models/connections')
const app=express()
const db=require('./models/connections')
app.use(express.json())

// show user
app.get("/showuser",(req,res)=>{
    let sql="select * from`employee`"
    db.query(sql,(err,result)=>{
        if(err) throw err
        else
        res.json(result)
    })
})

const PORT=process.env.PORT||3000
app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING AT ${PORT}`)
})