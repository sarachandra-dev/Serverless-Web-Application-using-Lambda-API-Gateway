const mongoose = require('mongoose');

const shareSchema = new mongoose.Schema({
  code:      { type: String, required: true, index: true },
  text:      { type: String, required: true },
  expiresAt: { type: Date, required: true, index: { expireAfterSeconds: 0 } },
  views:     { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Share', shareSchema);
