var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    email: {
        type: String,
        index: { unique: true }  //must be unique 
      },
      password: {
        type: String,
        required: true},
      name: {
        type: String,
        required: true},
});

// This creates our model from the above schema, using mongoose's model method
var Users = mongoose.model('Users', UsersSchema);
/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 * compares password to make sure it matches what is inputted 
 */
UserSchema.methods.comparePassword = function comparePassword(password, callback) {
    bcrypt.compare(password, this.password, callback);
  };
  
  
  /**
   * The pre-save hook method.
   * You also can notice a hook method UserSchema.pre('save') that will be executed before saving. In this method, the bcrypt module will generate a hash from a generated earlier salt string and a user’s password. This hash instead of a user’s password will be saved in the collection.
   */
  
  
  UserSchema.pre('save', function saveHook(next) {
    const user = this;
  
    // proceed further only if the password is modified or the user is new. This generation will be executed only if it’s a new document or the password field has been changed: 
    if (!user.isModified('password')) return next();
  
  
    return bcrypt.genSalt((saltError, salt) => {
      if (saltError) { return next(saltError); }
  
      return bcrypt.hash(user.password, salt, (hashError, hash) => {
        if (hashError) { return next(hashError); }
  
        // replace a password string with hash value (hash value stored in db)
        user.password = hash;
  
        return next();
      });
    });
  });
  
  module.exports = mongoose.model('User', UserSchema);
  
