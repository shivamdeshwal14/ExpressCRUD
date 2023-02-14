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
// show a particular use
app.get('/showuser/:id',(req,res)=>{
   
    let sql="SELECT * FROM `employee`WHERE id="+req.params.id+""
    db.query(sql,(err,result)=>{
        if(err) throw err
        else
        res.json(result)
    })
})
// DELETE
app.delete("/deleteuser/:id",(req,res)=>{
    let id=req.params.id
    let sql=`DELETE FROM employee WHERE id='${id}'`
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