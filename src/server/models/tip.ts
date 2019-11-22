import * as mongoose from 'mongoose';

const tipSchema = new mongoose.Schema({
  wpId: Number,
  images: String,
  title: { en: String, fi: String, se: String },
  tag: { en: String, fi: String, se: String },
  url: { en: String, fi: String, se: String },
  environmentEffect: { en: String, fi: String, se: String },
});

const Tip = mongoose.model('Tip', tipSchema);

export default Tip;
