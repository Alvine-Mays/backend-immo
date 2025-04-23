// backend/models/Message.js
const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  content: {
    type: String,
    required: true,
  },
  responded: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Message', messageSchema);
