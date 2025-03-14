const express = require('express')
const app =express();
const fs = require('fs')
const path =  require('path')
//parse the form//built in middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))


app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, "views"));

app.get('/',function(req,res){
    fs.readdir('./files',(err,files)=>{
        res.render('index',{files:files})
        
    })
})

app.post('/create', (req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join()}`,req.body.details,(err)=>{
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
    res.render('editfiles',{value:req.params.filename})
})

app.post('/edittitle',(req,res)=>{
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,(req,res)=>{
    })
    res.redirect('/')
})

app.get('/editdetails/:filename/:filedata',(req,res)=>{
    res.render('editdetails',{
        filename:req.params.filename,
        filedata:req.params.filedata
    })

    
    
})

app.post('/update',(req,res)=>{
    fs.writeFile(`./files/${req.body.header}`,`${req.body.content}`,(err)=>{
        res.redirect('/')
    })
   
})

app.get('/delete/:value',(req,res)=>{
    fs.unlink(`./files/${req.params.value}`,(err)=>{

    })
    res.redirect("/")
})



app.listen(3000,()=>{
    console.log("server is running on port 3000")
})
