const Res = require("../models/restaurant.model.js");
//create restaurant
const resValidator = require('@validator/restaurant.validator');
module.exports = {
  createRest: {
     validate:resValidator.restaurantValidation,
    pre: [
      {
        assign: "createRest",
        method: async (req, h) => {
          try {
            // const { resname, menutype, menucount, dishname, disprice, offername, discount } = req.payload;
            //  console.log(resname);
            // console.log(typeof req.payload);
            // Now you can use these variables to create a new restaurant entry using the Mongoose model

            const newRestaurant = new Res(req.payload);
            await newRestaurant.save();
            return h
              .response({ message: "Restaurant created successfully" })
              .code(201);
          } catch (error) {
            console.error("Error creating restaurant:", error);
            return h.response({ error: "Internal Server Error" }).code(500);
          }
        },
      },
    ],
    handler: async (request, h) => {
      return h.response(request.pre.createRest);
    },
  },
  getlistRest: {
    validate:resValidator.gerRestaurantValidation,
    pre: [
      {
        assign: "getlistRest",
        method: async (req, h) => {
          try {
            // console.log("heloo");
            const restaurantsList = await Res.find();
            return h
              .response({
                restaurantsList,
                message: "Restaurant Get Successfully",
              })
              .code(200);
          } catch (error) {
            // console.error(error);
            return h.response({ error: "Internal Server Error" }).code(500);
          }
        },
      },
    ],
    handler: async (request, h) => {
      return h.response(request.pre.getlistRest);
    },
  },
  deleteRest: {
    validate:resValidator.deteleResValidation,
    pre: [
      {
        assign: "deleteRest",
        method: async (req, h) => {
          try {
            // console.log(req);
            const { id } = req.params;
            const deletedRestaurant = await Res.findByIdAndDelete(id);
            if (!deletedRestaurant) {
              return h.response({ message: "Restaurant not found" }).code(404);
            }
            return h
              .response({ message: "Restaurant deleted successfully" })
              .code(200);
          } catch (error) {
            console.error("Error deleting restaurant:", error);
            return h.response("Internal Server Error").code(500);
          }
        },
      },
    ],
    handler: async (request, h) => {
      return h.response(request.pre.deleteRest);
    },
  },
  deleteRestMenu: {
    // validate:websiteValidator.getWebsiteList,
    pre: [
      {
        assign: "deleteRestMenu",
        method: async (req, h) => {
          try {
            //     // console.log(req);
                const { id } = req.params;
            
                const deletedRestaurant = await Res.updateOne(
                  { "menu._id": id },
                  { $pull: { menu: { _id: id } } }
                );
                if (!deletedRestaurant) {
                  return h.response({ deletedRestaurant,
                     message: "RestaurantMenu not found" }).code(404);
                }
                return h.response({ message: "RestaurantMenu deleted successfully" }).code(200);
              } catch (error) {
                return h.response("qwqwqwqqw").code(500);
              }
            }
      },
    ],
    handler: async (request, h) => {
      return h.response(request.pre.deleteRestMenu);
    },
  },
};




// delete api
// const deleteRest = async (req, h) => {
//   try {
//     // console.log(req);
//     const { id } = req.params;
//     const deletedRestaurant = await Res.findByIdAndDelete(id);
//     if (!deletedRestaurant) {
//       return h.response({ message: "Restaurant not found" }).code(404);
//     }
//     return h.response({ message: "Restaurant deleted successfully" }).code(200);
//   } catch (error) {
//     console.error("Error deleting restaurant:", error);
//     return h.response("Internal Server Error").code(500);
//   }
// };

// const deleteRestMenu = async (req, h) => {
//   try {
//     // console.log(req);
//     const { id } = req.params;

//     const deletedRestaurant = await Res.updateOne(
//       { "menu._id": id },
//       { $pull: { menu: { _id: id } } }
//     );
//     if (!deletedRestaurant) {
//       return h.response({ deletedRestaurant,
//          message: "RestaurantMenu not found" }).code(404);
//     }
//     return h.response({ message: "RestaurantMenu deleted successfully" }).code(200);
//   } catch (error) {
//     return h.response("qwqwqwqqw").code(500);
//   }
// };

//   update data

// const updateRest = async (req, h) => {
//   try {
//     const { id } = req.params;
//     const {
//       resname,
//       menutype,
//       menucount,
//       dishname,
//       disprice,
//       offername,
//       discount,
//     } = req.payload;

//     // Construct the update object with the fields you want to update
//     const updateData = {
//       resname,
//       menutype,
//       menucount,
//       dishname,
//       disprice,
//       offername,
//       discount,
//     };

//     // Use findByIdAndUpdate to update the restaurant
//     const updatedRestaurant = await Res.findByIdAndUpdate(id, updateData, {
//       new: true,
//     });

//     if (!updatedRestaurant) {
//       return h.response({ message: "Restaurant not found" }).code(404);
//     }

//     return h
//       .response({
//         message: "Restaurant updated successfully",
//         updatedRestaurant,
//       })
//       .code(200);
//   } catch (error) {
//     console.error("Error updating restaurant:", error);
//     return h.response("Internal Server Error").code(500);
//   }
// };

// module.exports = {
//   createRest,
//   getlistRest,
//   deleteRest,
//   updateRest,
//   deleteRestMenu,
// };
