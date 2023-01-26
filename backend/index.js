const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

// cross-platform compatibility
app.use(cors());

// body-parser
app.use(express.json());

// setting api routes
app.use('/',require('./routers'));

// configure env file
dotenv.config({path: '.env'});

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log(`http://localhost:${PORT}`));