import * as mongoose from 'mongoose';

const navigationSchema = new mongoose.Schema({
  html: { fi: String, en: String, se: String },
});

const Navigation = mongoose.model('Navigation', navigationSchema);

export default Navigation;
