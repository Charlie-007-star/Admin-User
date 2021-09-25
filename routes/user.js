const { response } = require('express');
var express = require('express');
var router = express.Router();
const session=require('express-session')
var userHelpers=require("../helpers/user-helper")


// products
let products=[
  {
    name:"Shirts",
    category:"Dress",
    descreption : "20% discount available",
    image:"https://cdn.shopify.com/s/files/1/0752/6435/products/florengreeeg.jpg?v=1622786087"
  },
  {
    name:"Shirts",
    category:"Dress",
    descreption : "20% discount available",
    image:"https://cdn.shopify.com/s/files/1/0752/6435/products/florengreeeg.jpg?v=1622786087"
  },
  {
    name:"Shirts",
    category:"Dress",
    descreption : "20% discount available",
    image:"https://cdn.shopify.com/s/files/1/0752/6435/products/florengreeeg.jpg?v=1622786087"
  },
  
]


/* GET user home page. */
router.get('/', function(req, res, next) {
  let user= req.session.user

  res.render('index', { products,user});
});


// log in 
router.get('/login',(req,res)=>{
  if(req.session.user)
  {
       res.redirect('/')
  }
  else
  {

  res.render('userLogin',{"LoginErr":req.session.loginErr})
  }
  req.session.loginErr=false
})


// Signup
router.get('/signup',(req,res)=>{

  if(req.session.signupErr){
   let  signupStatus=req.session.signupErr
    res.render('userSignup',{signupStatus})
  }
  else{
    res.render('userSignup')
  }
})



router.post('/signup',(req,res)=>{
  userHelpers.doSignup(req.body).then((response)=>{
         console.log(response);
         if (response.signupStatus){

           res.redirect('/login')
         }
         else
         {
           req.session.signupErr=true
           res.redirect('/signup')
         }
        })
})



router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true;
      req.session.user=response.user
      res.redirect('/')
     
    }
    else {
      req.session.loginErr=true;
      res.redirect('/login')
    }
  })
})

// logout
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.header('Cache-control','private, no-cache,no-store,max-age=0,must-revalidate,pre-check=0,post-check=0')
  res.redirect('/')
})


module.exports = router;
