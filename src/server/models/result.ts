import * as mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  co2e: {
    type: Number,
    default: 0,
  },
  categoryCO2e: [
    {
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
      co2e: {
        type: Number,
        default: 0,
      },
    },
  ],
  answers: [
    {
      answer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer',
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Result = mongoose.model('Result', resultSchema);

export default Result;
