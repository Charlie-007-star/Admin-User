var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin');
});

router.get('/admincreate' , function(req, res, next) {
  res.render('admincreate')
})



module.exports = router;
