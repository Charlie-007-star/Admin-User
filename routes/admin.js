var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin');
});

router.get('/admindata' , function(req, res, next) {
  res.render('admindata');
});

router.get('/admincreate' , function(req, res, next) {
  res.render('admincreate')
})

router.get('/adminedit', function(req, res, next) {
  res.render('adminedit');
})



module.exports = router;

