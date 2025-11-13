require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const requestTypesRouter = require('./routes/requestTypes');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/request-types', requestTypesRouter);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  connectDB(process.env.MONGO_URI).then(() => {
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port ${PORT}`);
    });
  });
}

module.exports = app;
