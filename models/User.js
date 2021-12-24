const {
  model,
  Schema,
  models
} = require('mongoose');

const UserSchema = new Schema ({
  displayName: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

module.exports = models.User || model('User', UserSchema);