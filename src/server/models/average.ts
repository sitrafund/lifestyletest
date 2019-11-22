import * as mongoose from 'mongoose';

const averageSchema = new mongoose.Schema({
  categories: Array,
  average: Number,
  count: Number,
});

const Average = mongoose.model('Average', averageSchema);

export default Average;
