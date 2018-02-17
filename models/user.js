const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validateEmail = (email) => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  items: [{
    access_token: {
      type: String,
      unique: true
    },
    item_id: {
      type: String,
      unique: true
    },
    name: {
      type: String
    },
    institution_id: {
      type: String,
      unique: true
    },
    accounts: [{
      id: {
        type: String,
        unique: true
      },
      name: {
        type: String
      },
      type: {
        type: String
      },
      subtype: {
        type: String
      }
    }]
  }],
  transactions: [{
    type: Schema.Types.ObjectId,
    ref: Transaction
  }]
});

const User = mongoose.model("User", bookSchema);

module.exports = User;
