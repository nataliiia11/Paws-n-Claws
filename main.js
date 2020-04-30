
const port = 3000;
const express=require('express');
const ejs= require('ejs')
const bodyParser = require('body-parser')
const app= new express();
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get('/:page',(req,res)=>{
    const definedPage=req.params.page
    res.render(definedPage)
})
app.post('/personal',(req,res)=>
console.log(req.body.newPost))

app.listen(3000,()=>
console.log("Listening on Port 3000"))