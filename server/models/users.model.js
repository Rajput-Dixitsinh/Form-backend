





const mongoose = require("mongoose");
var jwt = require('jsonwebtoken');
const Schema = mongoose.Schema

// const Types = mongoose.Types

const modelName = 'Users';

const dbConn = require('@plugins/mongoose.plugin').plugin.mainDbConn()

const bcrypt = require('bcrypt');


const signUpSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email : {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // confirmPassword: {
  //   type: String,
  //   required: true
  // },
  refreshToken: {
    type: String
}
  
});
                                                           
signUpSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})
signUpSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

signUpSchema.methods.generateAccessToken = function() {
  return jwt.sign({
      _id : this._id,
      username : this.username,
      email:this.email,
      password:this.password,
  },
   process.env.ACCESS_TOKEN_SECRET,
  {
      expiresIn : process.env.ACCESS_TOKEN_EXPIRY // Corrected 'expiryIN' to 'expiresIn'
  });
};


signUpSchema.methods.generateRefreshToken = function() {
  return jwt.sign({
      _id: this._id
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
  });
};



const signUpModel = dbConn.model(modelName, signUpSchema);

module.exports = signUpModel;