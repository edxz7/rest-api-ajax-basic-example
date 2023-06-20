const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const countrySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    },
    confirmed: String,
    recovered: String,
    deaths: String
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Country = model("Country", countrySchema);

module.exports = Country;
