const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const config = require('./config/key');

const userRouter = require('./routes/users');

const port = process.env.PORT || 5000;
const app = express();

// avoid cors error
app.use(cors());
// application/json
app.use(express.json());
app.use(cookieParser());
// application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// connect to DB
mongoose.connect( config.mongoURI, {
    // error 방지
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
.catch( err => console.log(err));

//router
app.use('/api/users', userRouter);

app.listen(port, () => console.log(`Listening on port ${port}...`))