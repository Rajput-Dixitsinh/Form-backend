const Users = require("../models/users.model.js");
const Cookie = require("@hapi/cookie");
var jwt = require("jsonwebtoken");
const authvalidator = require("@validator/auth.validator");
const bcrypt = require('bcrypt');
module.exports = {
  createUser: {
    validate: authvalidator.signUp,
    pre: [
      {
        assign: "createUser",
        method: async (req, h) => {
          try {
            console.log("hello");
            const { email, username, password } = req.payload;

            if (
              [email, username, password].some((field) => field?.trim() === "")
            ) {
              throw new Error(400, "All fields are required")``;
            }

            // cheack user is already exists or note

            const existedUser = await Users.findOne({
              $or: [{ username }, { email }],
            });

            console.log("hsdfh" + existedUser);

            if (existedUser) {
              throw new Error(
                409,
                "User with email or username already exists"
              );
            }

            const user = await Users.create({
              email,
              password,
              username: username.toLowerCase(),
            });

            const createdUser = await Users.findById(user._id)
              .select("-password -refreshToken")
              .lean();

            if (!createdUser) {
              throw new Error(
                500,
                "Something went wrong while registering the user"
              );
            }

            return h
              .response({ createdUser, message: "Create User Successfully" })
              .code(201);
          } catch (error) {
            console.error("Error creating restaurant:", error);
            return h
              .response({ error: "Internallllll Server Error" })
              .code(500);
          }
        },
      },
    ],
    handler: async (request, h) => {
      return h.response(request.pre.createUser);
    },
  },
  loginUser: {
    validate: authvalidator.signin,
    pre: [
      {
        assign: "loginUser",
        method: async (req, h) => {
          try {
            // get user data

            const { username, email, password } = req.payload;
            console.log(email);
            //cheack email and password is required

            if (!email && !password) {
              throw new Error("Please Enter your email and password");
            }
            //find the user is exist or  not

            const user = await Users.findOne({
              $or: [{ username }, { email }],
            });

            if (!user) {
              throw new Error("User Is not Available");
            }

            // check password

            const isPasswordValid = await user.isPasswordCorrect(password);

            if (!isPasswordValid) {
              throw new Error(404, "Invalid User Password");
            }

            const userToken = await Users.findById(user._id);
            const refreshToken = await userToken.generateRefreshToken();
            const accessToken = await userToken.generateAccessToken();

            // remove password and refrace token

            const logdinUser = await Users.findById(user._id).select(
              " -password -refreshToken "
            );

            const option = {
              httpOnly: true,
              secure: true,
            };

            // h.state('refreshToken', refreshToken, option);
            // h.state('accessToken', accessToken, option);

            return h
              .response({
                user: logdinUser,
                accessToken,
                refreshToken,
                message: "User logged In Successfully",
              })
              .code(200);
          } catch (error) {
            console.error("Error creating restaurant:", error);
            return h.response({ error: "Internal Server Error" }).code(500);
          }
        },
      },
    ],
    handler: async (request, h) => {
      return h.response(request.pre.loginUser);
    },
  },
  logout: {
    pre: [
      {
        assign: "logoutUser",
        method: async (request, h) => {
          try {
            return h.response({ message: "User Logged out successfully!" });
          } catch (err) {
            return h.response({ error: "Something went wrong!" }).code(401);
          }
        },
      },
    ],
    handler: async (request, h) => {
      return h.response(request.pre.logoutUser).code(200);
    },
  },
  changePassword: {
    pre: [
      {
        assign: "changePassword",
        method: async (req, h, next) => {
          try {
            // console.log("hello");
            // console.log(req);
            const { token, oldPassword, newPassword } = req.payload;
            // console.log(token, oldPassword, newPassword);
            let decodedToken;
            try {
              decodedToken = jwt.verify(token, "rtetretertre");
            } catch (error) {
              return h.response({ message: "Invalid token" }).code(400);
            }

            // Extract email from token payload
            const _id = decodedToken._id;
            console.log(_id);

            const user = await Users.findById({ _id: _id });
            // console.log("user is " + user);
            if (!user) {
              return h.response({ message: "User not found" }).code(404);
            }
           
           const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password)
          
            // const isPasswordCorrect = await Users.isPasswordCorrect(oldPassword);
            console.log(isPasswordCorrect);
            if (!isPasswordCorrect) {
              throw new Error(400, "Invalid password");
            }
            
            // return true;
            user.password = newPassword;

            console.log(user.password);

            await user.save((validateBeforSave = false));

            return h
              .response({
                message: "passswoed changed successfully",
              })
              .code(200);
          } catch (error) {
            throw new Error(401, error?.message || "Invalid access token");
          }
        },
      },
    ],
    handler: async (request, h) => {
      return h.response(request.pre.changePassword).code(200);
    },
  },
};
