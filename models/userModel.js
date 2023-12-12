const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email",
    },
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["Admin", "MonthlySubscription", "YearlySubscription", "None"],
    default: "None",
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address1: { type: String },
  address2: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  country: { type: String },
  linkedin: { type: String },
  github: { type: String },
  twitter: { type: String },
  portfolio: { type: String },
  workExp: [{ type: mongoose.Schema.Types.ObjectId, ref: "workexperiences" }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "projects" }],
  skills: [{ type: String }],
});
userSchema.statics.signup = async function (userData) {
  const {
    email,
    password,
    firstName,
    lastName,
    address1,
    address2,
    city,
    state,
    zip,
    country,
    linkedin,
    github,
    twitter,
    portfolio,
    skills,
    projects,
    workExp,
  } = userData;
  console.log(userData);
  if (!email || !password || !firstName || !lastName) {
    throw Error("All required fields must be provided");
  }

  if (!validator.isEmail(email)) {
    throw Error("Please enter a valid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
    firstName,
    lastName,
    address1,
    address2,
    city,
    state,
    zip,
    country,
    linkedin,
    github,
    twitter,
    portfolio,
    skills,
    projects,
    workExp,
  });

  return user;
};

userSchema.statics.getUserDetails = async function (userId) {
  if (!userId) {
    throw new Error("User ID is required to fetch user details");
  }

  const userDetails = await this.findById(userId).select("-password");

  if (!userDetails) {
    throw new Error("User not found for the given ID.");
  }

  return userDetails;
};

// userSchema.statics.signup = async function (email, password) {
//   if (!email || !password) {
//     throw Error("All fields are required");
//   }

//   if (!validator.isEmail(email)) {
//     throw Error("Please enter a valid email");
//   }

//   if (!validator.isStrongPassword(password)) {
//     throw Error("Password is not strong enough");
//   }

//   const exists = await this.findOne({ email });

//   if (exists) {
//     throw Error("Email already in use");
//   }

//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(password, salt);

//   const user = await this.create({ email, password: hash });

//   return user;
// };

// userSchema.statics.login = async function (email, password) {
//   if (!email || !password) {
//     throw Error("All fields are required");
//   }

//   const user = await this.findOne({ email });

//   if (!user) {
//     throw Error("Email does not exist");
//   }

//   const match = await bcrypt.compare(password, user.password);

//   if (!match) {
//     throw Error("Invalid password");
//   }

//   return user;
// };

userSchema.statics.updateRole = async function (_id, role) {
  if (!_id || !role) {
    throw new Error("User ID and role are required for updating the role");
  }

  const updatedUser = await this.findOneAndUpdate({ _id }, { $set: { role } }, { new: true });

  if (!updatedUser) {
    throw new Error("User not found for the given ID.");
  }

  return updatedUser;
};

module.exports = mongoose.model("User", userSchema);
