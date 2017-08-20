var mongoose = require('mongoose');
var fs = require('fs');
var config = require(__base + 'server/config');
var modelsPath = __base + 'server/db/models/';
var path = require('path');

var files = fs.readdirSync(modelsPath);

mongoose.connect(config.db.url, {
  useMongoClient: true,}, function(err){
    if(err){
        console.log("Not connected to the database. :"+err);
    } else{
        console.log("Connected to MONGODB!");
    }
});



module.exports.createModel = (name, schema) => mongoose.model(name, schema);

module.exports.createSchema = schemaObj => mongoose.Schema(schemaObj);

module.exports.models = (function() {
    var files = fs.readdirSync(modelsPath);
    return files.reduce((obj, fileName) => {
        var name = path.parse(fileName).name;
        obj[name.replace(/^./, name[0].toUpperCase())] = require(modelsPath + fileName);
        return obj;
    }, {});
}());
