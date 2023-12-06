const { Schema, model } = require('mongoose');
const Response = require('./Response');

// Schema to create Post model
const thoughSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
     
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: date=>date.toLocaleDateString() 
       },
    advertiserFriendly: {
      type: Boolean,
      default: true,
      
    },
    description: {
      type: String,
      minLength: 15,
      maxLength: 500,
    },
    responses: [Response],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `responses` that gets the amount of response per though
thoughSchema
  .virtual('getResponses')
  // Getter
  .get(function () {
    return this.responses.length;
  });

// Initialize our though model
const though = model('though', thoughSchema);

module.exports = though;
