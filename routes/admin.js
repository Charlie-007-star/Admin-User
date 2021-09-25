var express = require('express');
const session = require('express-session');
var router = express.Router();
const userHelpers=require("../helpers/user-helper")


// Admin data
let adminUsername = "sujin";
let adminPassword = "sujin"


/* GET admin home page */
router.get('/', function (req, res, next) {
  
  res.header('Cache-control','private, no-cache,no-store,max-age=0,must-revalidate,pre-check=0,post-check=0')
  if(req.session.isLoggedIn)
  {
    res.redirect('/admin/home')
  }
  else
  {
     if(req.session.attempt){
     delete req.session.attempt
     var message ={message: "Please enter valid username or password"}
     }else{
      var message = {message: " "}
     }
    res.render('admin', message) 
} 
})



// Checking admin username and password
router.post("/adminlogin", (req, res) => {
  
  if (req.body.username == adminUsername && req.body.password == adminPassword) {
    req.session.name=adminUsername;
    req.session.password=adminPassword;
    req.session.isLoggedIn=true;
    res.redirect("/admin/home")
  }
  else {
    res.header('Cache-control','private, no-cache,no-store,max-age=0,must-revalidate,pre-check=0,post-check=0')
    req.session.attempt=true;
    res.redirect("/admin")
  }
})



router.get("/home", function (req, res, next) {
  if(req.session.isLoggedIn){
  userHelpers.getAllUserDetails().then((data)=>{
   res.header('Cache-control','private, no-cache,no-store,max-age=0,must-revalidate,pre-check=0,post-check=0')
   res.render('adminHome',{users:data})
  }).catch((er)=>{
   console.log(er)
  })
  }else{
    res.redirect("/admin")
  }
});


// add user page
router.get("/addUser", (req, res) => {
  res.render("addUser");
})


// Adding user to the database admin home
router.post("/addUser", (req, res) => {
  userHelpers.addUser(req.body).then((response)=>{
    console.log(response);
    res.redirect('/admin/home')
  })
})


// logout admin 
router.get('/logout',(req,res)=>{
  
 console.log(req.session.isLoggedIn);
  delete req.session.isLoggedIn;
  console.log(req.session.isLoggedIn);
  res.header('Cache-control','private, no-cache,no-store,max-age=0,must-revalidate,pre-check=0,post-check=0')
  res.redirect('/admin')

})


// deleting users
router.get('/deleteUser/:id',(req,res)=>{
     let userId=req.params.id
     userHelpers.deleteUsers(userId).then((response)=>{
       res.redirect('/admin/home')
     })
})


// edit users
router.get("/editUser/:id",async(req,res)=>{
  console.log('this id')
  console.log(req.params.id)
  let user = await userHelpers.getUserDetails(req.params.id)
  console.log("edit");
   console.log(user);
  res.render("editUser",{user})
})


// updating the edit user to admin home page
router.post("/editUser/:id",async(req,res)=>{
  console.log(req.body);
  userHelpers.updateUser(req.params.id,req.body).then(()=>{
    res.redirect('/admin/home')
  })
})


module.exports = router;
