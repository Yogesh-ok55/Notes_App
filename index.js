const express = require('express')
const app =express();
const fs = require('fs')
const path =  require('path')
//parse the form//built in middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))


app.set('view engine', 'ejs')

app.get('/',function(req,res){
    fs.readdir('./files',(err,files)=>{
        res.render('index',{files:files})
        
    })
})

app.post('/create', (req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join()}.txt`,req.body.details,(err)=>{
        res.redirect('/');
    })
})

app.get('/files/:filename',(req,res)=>{
      fs.readFile(`./files/${req.params.filename}`,'utf-8',(err,data)=>{
        res.render('details',{
            filename:req.params.filename,
            filedata: data
        })
      })
})

app.get('/editfiles/:filename',(req,res)=>{
    res.render('editfiles')
})

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})