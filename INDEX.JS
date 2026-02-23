const express = require('express')
const app = express()
app.use(function(req,res,next){
    console.log("middleware working");
    next();
});

app.set("view engine","ejs");
app.use(express.static('./public'));
app.get('/', function (req, res) {
  res.render("index");
})
app.get('/profile', function (req, res) {
    res.send('Hello  profile World')
  })
  app.get('/error', function (req, res,next) {
   throw Error("Something went wrong");
  })
  app.get('/profile/:username', function (req, res) {
    res.send(`hello from ${req.params.username}`)
  })
  app.use(function errorHandler (err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
  })
app.listen(3000);