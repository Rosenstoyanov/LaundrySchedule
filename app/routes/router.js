var router = require('express').Router();
var User = require(__base + 'app/db').models.User;

router.get("/", function(req, res){
  res.send("Hello Word")
})

router.post('/register', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    if (validateEmail(email)) {
      var user = new User({ email: email, password: password });
      user.save(function(err) {
        console.log("error: " + err);
          if(err) return res.status(500).json({message: "Something is wrong"});
          res.status(200).json({message: "User has been saved"});
      })
    } else {
      res.status(401).json({message: "invalid email"})
    }

});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


module.exports = router;
