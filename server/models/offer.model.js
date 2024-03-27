const mongoose = require("mongoose");

// const Schema = mongoose.Schema

// const Types = mongoose.Types

const modelName = 'offerSchema'

const dbConn = require('@plugins/mongoose.plugin').plugin.mainDbConn()


const OfferSchema = new mongoose.Schema({
    offerName: {
      type: String,
      required: true
    },
    discount: {
      type: String,
      required: true
    },
  
  });

  
exports.schema = dbConn
.model(modelName, OfferSchema);

