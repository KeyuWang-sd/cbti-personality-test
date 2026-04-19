const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  answers: {
    type: [Number],
    required: true
  },
  scores: {
    S: { type: Number, required: true },
    L: { type: Number, required: true },
    D: { type: Number, required: true },
    W: { type: Number, required: true }
  },
  personality: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    code: { type: String, required: true },
    description: { type: String, required: true },
    isEasterEgg: { type: Boolean, default: false }
  },
  dimensionResults: {
    S: {
      direction: { type: String, required: true },
      score: { type: Number, required: true }
    },
    L: {
      direction: { type: String, required: true },
      score: { type: Number, required: true }
    },
    D: {
      direction: { type: String, required: true },
      score: { type: Number, required: true }
    },
    W: {
      direction: { type: String, required: true },
      score: { type: Number, required: true }
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Result', resultSchema);
