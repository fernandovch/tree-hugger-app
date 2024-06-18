require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./src/config/config');
const app_router = require('./src/routes/router');

const admin = require('firebase-admin');
const { cert } = require('firebase-admin/app');
const serviceAccount = require('./src/config/gcfb-auth.json');

const router = require('express').Router();

admin.initializeApp({
  credential: cert(serviceAccount)
});


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(app_router( router,admin));

const port = config.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}!`));