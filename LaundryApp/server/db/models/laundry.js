var db = require(__base + 'server/db');
var mongoose = require('mongoose');

var LaundrySchemaObj = {
    title: { type : String, required : true },
    description: { type : String, required : true },
    booked: { type : Boolean, default : false },
    user: { type : mongoose.Schema.Types.ObjectId, ref: 'User' },
    bookedAt:  { type: Number, default: Date.now() },
    expiresAt:  { type: Number, default: Date.now() }    
};

var laundrySchema = db.createSchema(LaundrySchemaObj);

module.exports = db.createModel('Laundry', laundrySchema);
