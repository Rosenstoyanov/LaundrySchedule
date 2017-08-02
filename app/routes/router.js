var router = require('express').Router();
var User = require(__base + 'app/db').models.User;

router.get("/", function(req, res){
  res.send("Hello Word")
})

router.post('/register', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var user = new User({ email: email, password: password });
    user.save(function(err) {
        if(err) return res.status(500).end();
        res.status(200).end();
    })
});


module.exports = router;
