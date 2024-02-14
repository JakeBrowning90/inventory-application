const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.get('/log-in', function(req, res, next) {
//   res.render("user_log_in", {
//     title:"User Login"
//   })
// });

module.exports = router;
