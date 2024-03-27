const mongoose = require("mongoose");

// const Schema = mongoose.Schema

// const Types = mongoose.Types

const modelName = 'dishSchema';

const dbConn = require('@plugins/mongoose.plugin').plugin.mainDbConn()
const OfferSchema = require('@models/offer.model').schema


const DishSchema = new mongoose.Schema({
    dishName: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    offer: [OfferSchema.schema]
  });

 exports.schema = dbConn
.model(modelName, DishSchema);

