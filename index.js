const express=require('express')

const { resume } = require('./models/connections')
const app=express()
const engine=require('express-handlebars').engine   
const db=require('./models/connections')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


// default page
app.get("/",(req,res )=>{
     res.render('home')
     showmsg()
})
//    create user
app.post("/adduser",(req,res)=>{
    
    const user={name:req.body.name,email:req.body.email,city:req.body.city,phone:req.body.phone}
    let sql="INSERT INTO `employee` SET ?"
    db.query(sql,user,(err,result)=>{
        if(err) throw err
        else
        res.render('home')
    })
})
// show  all user
app.get("/showuser",(req,res)=>{
    let sql="select * from`employee`"
    db.query(sql,(err,result)=>{
        if(err) throw err
        else
        {
            
            res.render('show',({list:result}))
        } 
        
    })
})
// show a particular user
app. get('/showuser/:id',(req,res)=>{
   
    let sql="SELECT * FROM `employee`WHERE id="+req.params.id+""
    db.query(sql,(err,result)=>{
        if(err) throw err
        else
        res.json(result)
    })
})
// DELETE  user
app.get("/deleteuser/:id",(req,res)=>{
   console.log("hello");
    let id=req.params.id
    let sql=`DELETE FROM employee WHERE id='${id}'`
    db.query(sql,(err,result)=>{
        if(err) throw err
        else
        res.redirect('/showuser')
    })
})
// update user
app.post('/updateuser/:id',(req,res)=>{
    const id=req.params.id
    const name =req.body.name
    const email=req.body.email
    const city=req.body.city
    const phone=req.body.phone
    let sql=`update employee SET name='${name}',phone='${phone}',email='${email}',city='${city}' where id=${id}`
    db.query(sql,(err,result)=>{
        if(err) throw err
        else
         res.redirect("/showuser")
    })
})
//edit
app.get('/edituser/:id',(req,res)=>{
   
    let sql="SELECT * FROM `employee`WHERE id="+req.params.id+""
    db.query(sql,(err,result)=>{
        if(err) throw err
        else
        res.render('edituser',({list:result}))
        
    })

})
const PORT=process.env.PORT||3000
app.listen(PORT,()=>{
    
  console.log("server is running");
}) 