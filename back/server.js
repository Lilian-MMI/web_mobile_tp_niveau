const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

// Constants
const PORT = process.env.PORT || 8081;
const corsOptions = {
  origin: [
    process.env.NODE_ENV !== 'production'
      ? ['http://localhost:3000', 'http://localhost:3001']
      : process.env.FRONT_URL,
  ],
  credentials: true,
};

// App
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan('dev'));

// Routes
require('./routes/user.routes')(app);
require('./routes/marker.routes')(app);
require('./routes/dashboard.routes')(app);
require('./routes/mcq.routes')(app);

// Connect to DB
const dbURI =
  process.env.DB_URI ||
  'mongodb+srv://web_mobile_tp_niveau_user:web_mobile_tp_niveau_pwd@cluster0.iujoawj.mongodb.net/TP_niveau?retryWrites=true&w=majority';

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log('\x1b[33m%s\x1b[0m', `Server listen on port : ${PORT} 🚀`)
    );
  })
  .catch((err) => console.log(err));
