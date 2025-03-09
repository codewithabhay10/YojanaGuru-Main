const mongoose = require('mongoose');

const CachedSchemeSchema = new mongoose.Schema({
  schemeId: { type: String, required: true, unique: true },
  schemeName: { type: String, required: true },
  description: String,
  eligibility: {
    ageGroup: String,
    gender: String,
    category: String,
    location: String,
    occupation: String,
    incomeSlab: String,
  },
  benefits: String,
  category: String,
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CachedScheme', CachedSchemeSchema);
