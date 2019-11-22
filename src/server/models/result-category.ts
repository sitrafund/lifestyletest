import * as mongoose from 'mongoose';

const resultCategorySchema = new mongoose.Schema({
  index: Number,
  title: { en: String, fi: String },
  endInfoPositive: { en: String, fi: String, se: String },
  endInfoNegative: { en: String, fi: String, se: String },
  endInfoCommon: { en: String, fi: String, se: String },
  averageCo2e: Number,
  color: String,
  icon: String,
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    },
  ],
  slug: { en: String, fi: String, se: String },
  tags: {
    en: [mongoose.Schema.Types.Mixed],
    fi: [mongoose.Schema.Types.Mixed],
  },
  resultInfo: {
    image: String,
    title: { en: String, fi: String, se: String },
    altTitle: { en: String, fi: String, se: String },
    positiveDescription: { en: String, fi: String, se: String },
    negativeDescription: { en: String, fi: String, se: String },
  },
});

const ResultCategory = mongoose.model('ResultCategory', resultCategorySchema);

export default ResultCategory;
