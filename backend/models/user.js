const mongoose = require("mongoose");
const { createHmac } = require("crypto");
const { v4: uuidv4 } = require('uuid');


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: 30,
    },
    fname:{
        type:String,
        maxlength:20
    },
    email: {
      type: String,
      required: true,
    },
    encry_password: {
      type: String,
      required: true,
    },
    salt: String,
  },{timestamps:true}
);

userSchema.methods = {
  securePassword: function (plainpassword) {
    const secret = this.salt;
    const hash = createHmac("sha256", secret)
      .update(plainpassword)
      .digest("hex");
    return hash;
  },
  authenticate: function(password){
      return this.encry_password === this.securePassword(password)
  }
};

userSchema.virtual("password").set(function (password) {
  this._password = password;
  this.salt = uuidv4();
  this.encry_password = this.securePassword(password);
});

userSchema.virtual("name").set(function(name){
    this.username = name;
    this.fname = name.substring(0, name.indexOf(' ')) ? name.substring(0, name.indexOf(' ')) : name;
})

module.exports = mongoose.model("User",userSchema)
