var db = require(__base + 'app/db');

var LaundrySchemaObj = {
    title: { type : String, required : true },
    description: { type : String, required : true }
};

var laundrySchema = db.createSchema(LaundrySchemaObj);

module.exports = db.createModel('Laundry', laundrySchema);
