global.__base = __dirname + '/../../';
var config = require(__base + 'server/config');
var mongoose = require('mongoose');
var Laundry = require(__base + 'server/db').models.Laundry;


function updateReadyLaundries() {
    Laundry.find({ booked: true }, function (err, laundries) {
        if (err) {
            console.log(err);
        } else {
            console.log(JSON.stringify(laundries));

            var readyLaundries = laundries.filter(function (laundry) { return laundry.expiresAt < Date.now() });
            console.log(JSON.stringify(readyLaundries))
            readyLaundries.map(function (laundry) {
                console.log(JSON.stringify(laundry))
                //TODO: send notification to user
                Laundry.findByIdAndUpdate(laundry._id, { $set: { booked: false } }, { new: true }, function (err, user) {
                    if(err){

                    } else {

                    }
                });
            })
        }
    });
}

updateReadyLaundries();