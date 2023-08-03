const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    require: [true, `role is required`],
    enum: ["admin", "organization", "donar", "hostpital"],
  },
  name: {
    type: String,
    required: function () {
      if (this.role === "user" || this.role === "admin") {
        return true;
      }
      return false;
    },
  },

  organisationName: {
    type: String,
    require: function () {
      if (this.role === "organisatiom") {
        return true;
      }
      return false;
    },
  },
  hospitalName: {
    type: String,
    require: function () {
      if (this.role === "hospital") {
        return true;
      }
      return false;
    },
  },
  email: {
    type: String,
    required: [true, `email is required`],
    unique: true,
  },
  password: {
    type: String,
    required: [true, `password is required`],
  },
  website: {
    type: String,
  },
  address: {
    type: String,
    required: [true, `address is required`],
  },
  phone: {
    type: String,
    required: [true, `address is required`],
  },
}, { timestamps: true });

module.exports = mongoose.model('users', userSchema);