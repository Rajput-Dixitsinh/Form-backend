const mongoose = require("mongoose");

// const Schema = mongoose.Schema

// const Types = mongoose.Types

const modelName = 'restaurant'

const dbConn = require('@plugins/mongoose.plugin').plugin.mainDbConn()




// const mongoose = require('mongoose');

const MenuSchema = require('@models/menu.model').schema




const RestaurantSchema = new mongoose.Schema({
  resname: {
    type: String,
    required: true
    
  },
  menu: [MenuSchema.schema]
});

const RestaurantModel = dbConn
.model(modelName, RestaurantSchema);

module.exports = RestaurantModel;
