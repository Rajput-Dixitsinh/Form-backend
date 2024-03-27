const mongoose = require("mongoose");

// const Schema = mongoose.Schema

// const Types = mongoose.Types

const modelName = 'menuSchema';

const dbConn = require('@plugins/mongoose.plugin').plugin.mainDbConn()
const DishSchema = require('@models/dish.model').schema


const MenuSchema = new mongoose.Schema({
    restypes: {
      type: String,
      required: true
    },
    count: {
      type: String,
      required: true
    },
    dish: [DishSchema.schema]
  });


 exports.schema = dbConn
.model(modelName, MenuSchema);

