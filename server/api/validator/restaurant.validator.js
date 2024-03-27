

const Joi = require('joi');

// for create

const restaurantSchema = Joi.object({
    resname: Joi.string().required(),
  menu: Joi.array().items(Joi.object({
    restypes: Joi.string().required(),
    count: Joi.string().required(),
    dish: Joi.array().items(Joi.object({
        dishName: Joi.string().required(),
        price: Joi.string().required(),
        offer: Joi.array().items(Joi.object({
            offerName:Joi.string().required(),
            discount: Joi.string().required()
    }))
  }))
}))
})

const restaurantValidation = {
  payload: restaurantSchema
};


// for get

const gerRestaurantValidation = {};

// for edit

// const editPatientSchema = Joi.object({
//   name: Joi.string(),
//   age: Joi.number(),
//   sex: Joi.string(),
//   diseases: Joi.array().items(Joi.object({
//     diseaseName: Joi.string(),
//     medicines: Joi.array().items(Joi.object({
//       medicineName: Joi.string()
//     }))
//   }))
// });

// const editPatientValidation = {
//   payload: editPatientSchema
// };

// for delet


const deteleResValidation = {
  params: Joi.object({
    id: Joi.string().required()
  })
};


module.exports = {
    restaurantValidation,
    gerRestaurantValidation,
    deteleResValidation
  
  };
