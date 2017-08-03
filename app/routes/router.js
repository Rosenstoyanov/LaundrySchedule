var router = require('express').Router();
var bcrypt = require('bcrypt');
var User = require(__base + 'app/db').models.User;
var jwt = require(__base + 'app/utils/jwt');

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

router.post('/login', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    User.findOne({ email: email }, function(err, user) {
        if(err) return res.status(500).end();
        bcrypt.compare(password, user.password, function(err, match) {
            if(err) return res.status(500).end();
            if(!match) return res.status(200).json({ message: 'Wrong email or password!' });
            var token = jwt.sign({ _id: user._id });
            res.status(200).json({ token: token });
        });
    });
});

function mid(req, res, next) {
    var token;
    if(token = req.headers['x-access-token']) {
         jwt.verify(token).then(decoded => {
           console.log("headers decoded: " + decoded)
           if(decoded.email === 'ivan@abv.bg') next();
         });
         return;
    }
    res.status(401).json({ message: "invalid token" });
}

router.get('/laundries', mid, function(req, res) {
  res.status(200).json({ message: "success" })
});


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


module.exports = router;
