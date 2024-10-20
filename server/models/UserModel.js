// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const JWT = require("jsonwebtoken");
// const UserSchema = mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   country: {
//     type: String,
//     required: true,
//   },
//   city: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//   },
// });

// //functuions
// // hash func
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
// });

// // compare function
// userSchema.methods.comparePassword = async function (plainPassword) {
//   return await bcrypt.compare(plainPassword, this.password);
// };

// //JWT TOKEN
// userSchema.methods.generateToken = function () {
//   return JWT.sign({ _id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
// };

// const User = mongoose.model("User", UserSchema);
// module.exports = User;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
// UserSchema.methods.comparePassword = async function (plainPassword) {
//   return await bcrypt.compare(plainPassword, this.password);
// };
// UserSchema.methods.comparePassword = async function (plainPassword) {
//   console.log("Comparing:", plainPassword, this.password); // Log the values
//   return await bcrypt.compare(plainPassword, this.password);
// };

UserSchema.methods.comparePassword = async function (plainPassword) {
  console.log("Plain Password Type:", typeof plainPassword); // Should be 'string'
  console.log("Hashed Password Type:", typeof this.password); // Should be 'string'
  console.log("Comparing:", plainPassword, this.password);

  if (typeof plainPassword !== "string" || typeof this.password !== "string") {
    throw new Error("Invalid arguments: expected both inputs to be strings.");
  }

  return await bcrypt.compare(plainPassword, this.password);
};

// Generate JWT token
UserSchema.methods.generateToken = function () {
  return JWT.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
