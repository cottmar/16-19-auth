'use strict';

import mongoose from 'mongoose';

const dogsSchema = mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  bio: { type: String },
  avatar: { type: String },
  account: {
    type: mongoose.Schema.ObjectId,
    // Do I need an Account before I can create a Profile?
    required: true,
    // Can an account have more than one profile?
    unique: true, // this is setting a 1-1
  },
});

export default mongoose.model('dogs', dogsSchema);
