import * as mongoose from 'mongoose';

export function database() {
  mongoose.connect(process.env.MONGOHQ_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  const db = mongoose.connection;

  mongoose.Promise = Promise;

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
}
