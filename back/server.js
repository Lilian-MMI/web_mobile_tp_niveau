const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

// Constants
const PORT = 8081;
const corsOptions = {
  origin: ['http://localhost:3000'],
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
