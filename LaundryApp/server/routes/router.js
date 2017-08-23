var router = require('express').Router();
var bcrypt = require('bcrypt');
var User = require(__base + 'server/db').models.User;
var Laundry = require(__base + 'server/db').models.Laundry;
var jwt = require(__base + 'server/utils/jwt');
var dummyLaundryData = require(__base + 'server/utils/dummy-laundry-data.js');

router.post('/register', function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  if(!email){
    return res.status(400).json({ message: "Email must not be empty" })
  }

  if(!password){
    return res.status(400).json({ message: "Password must not be empty"})
  }

  if (validateEmail(email)) {
    var user = new User({ email: email, password: password });
    user.save(function (err) {
      if (err) return res.status(500).json({ message: "Something is wrong" });
      res.status(200).json({ message: "User has been saved" });
    })
  } else {
    res.status(400).json({ message: "Invalid email" })
  }

});

router.post('/login', function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  if (!email) {
    return res.status(400).json({ message: 'Email must not be empty' })
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email" })
  }

  if (!password) {
    return res.status(400).json({ message: 'Password must not be empty' })
  }

  User.findOne({ email: email }, function (err, user) {
    if (err) return res.status(500).json({ message: "Something is wrong" });

    if (user) {
      bcrypt.compare(password, user.password, function (err, match) {
        if (err) return res.status(500).json({ message: "Something is wrong" });
        if (!match) return res.status(400).json({ message: 'Wrong password!' });
        var token = jwt.sign({ _id: user._id });
        User.findByIdAndUpdate(user._id, { $set: { token: token } }, { new: true }, function (err, user) {
          // if (err) return console.log('error: ' + err);
          // console.log(user);
        });

        res.status(200).json({ token: token });
      });
    } else {
      res.status(400).json({ message: "email not registered"})
    }

  });
});

router.get('/profiles', function (req, res) {
  User.find({}, function (err, users) {
    if (err) return res.status(500).end();

    res.status(200).json({ users: users })
  });
});

router.get('/populateLaundries', function (req, res) {
  if(dummyLaundryData.prepopulateLaundries()){
    res.status(200).json({ message: "Success!!!"})
  } else {
    res.status(500).json({ message: "Something is wrong" })
  }
});

function mid(req, res, next) {
  var token = req.headers['x-access-token'];

  if (token) {
    User.findOne({ token: token }, function (err, user) {
      if (err) {
        return res.status(500).json({ message: "Something is wrong" });
      } else if (!user) {
        return res.status(401).json({ message: "Invalid token" });
      } else {
        req.user = user;
        next();
      }
    });
    // console.log(token)
    //  jwt.verify(token).then(decoded => {
    //    console.log("headers decoded: " + decoded)
    //    if(decoded.email === 'test@abv.bg') next();
    //  });
    //  console.log("meh")
  } else {
    res.status(401).json({ message: "token is missing" });
  }
}

router.get('/profile', mid, function (req, res) {
  var user = req.user.email
  if (user) {
    res.status(200).json({ user: { email: user.email } })
  } else {
    res.status(500).json({ message: "Something is wrong" });
  }
});
// mid,
router.post('/bookLaundry', mid, function (req, res) {
  var user = req.user;
  var laundryId = req.body.laundryId
  if (laundryId) {
    Laundry.findOne({ _id: laundryId }, function (err, laundry) {
      if (err) return res.status(500).json({ message: "Can not find Something is wrong" })

      if (laundry.booked) {
        return res.status(200).json({ message: "Laundry has been booked" })
      } else {
        //adding 2hours
        var expirationAt = Date.now();
        expirationAt += 2*60*60*1000
        Laundry.findByIdAndUpdate(laundryId, { $set: { booked: true, user: user._id, bookedAt: Date.now(), expiresAt: expirationAt } }, { new: true }, function (err, user) {
          if (err) return res.status(400).json({ message: "Could not update Something is wrong" })

          res.status(200).json({ message: "Laundry has been booked" })

        });
      }
    });
  } else {
    res.status(400).json({ message: "Laundry id is missing" })
  }
})

router.get('/laundries', function (req, res) {
  Laundry.find({}, function (err, allLaundries) {
    if (err) return res.status(500).end();

    res.status(200).json({ laundries: allLaundries })
  });
});

router.post('/addlaundry', function (req, res) {
  var title = req.body.title
  var description = req.body.description

  if (!title) {
    return res.status(400).json({ message: 'Title must not be empty' })
  }

  if (!description) {
    return res.status(400).json({ message: 'Description must not be empty' })
  }

  var laundry = new Laundry({ title: title, description: description });
  laundry.save(function (err) {
    console.log("error: " + err);
    if (err) return res.status(500).json({ message: "Something is wrong" });
    res.status(200).json({ message: "Laundry has been saved" });
  })
});

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}


module.exports = router;
