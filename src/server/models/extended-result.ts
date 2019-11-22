import * as mongoose from 'mongoose';

const extendedResultSchema = new mongoose.Schema({
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

const extendedResult = mongoose.model('extendedResult', extendedResultSchema);

export default extendedResult;
