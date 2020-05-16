
const port = 3000;

const express=require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const app= new express();
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});
const userRouter = require('./Router/userRouter');
const postController = require('./Controller/postController');
const errorController = require('./Controller/errorController');
const userController = require('./Controller/UserController');

app.use('/public', express.static(path.join(__dirname,'public')));
app.use(morgan(':method:url:status*:response-time ms'))
app.use('/user', userRouter);

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

//const posts=[];
app.get('/newsfeed',postController.getAllPostsNewsfeed);
app.get('/:page',postController.getAllPostsPersonal);
//res.redirect('/personal/'+definedPage,{newPost:posts,page:'personal'});
app.get('/personal',postController.getAllPostsPersonal);


app.get('/',(req,res)=>{
	res.render('index');
});


app.post('/:page/delete',postController.deletePost);



app.post('/:page',postController.savePost);


app.post('/upload', upload.single('photo'), (req, res) => {
	if(req.file) {
		res.json(req.file);
	}
	else throw 'error';
});

   
      
app.listen(3000,()=>
	console.log(`Listening on Port ${port}`));


//mongoose implementation
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin-hanh:hanh@cluster1-yhbkr.mongodb.net/PawsAndClaws', {useNewUrlParser: true, useUnifiedTopology: true});
var database = mongoose.connection;
database.on('error', console.error.bind(console, 'Connection error'));
database.once('open', () => {
	console.log('Connection to database Paws And Claws succesfull.');
});
