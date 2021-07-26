const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {User} = require('./models/User');
const mongoose = require('mongoose');

const port = 3000;
const config = require('./config/key')

// application/json
app.use(express.json())
// application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}))

// connect to DB
mongoose.connect( config.mongoURI, {
    // error 방지
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
.catch( err => console.log(err))

app.get('/', (req, res) => res.send('Hello World! hihi'))

app.post('/register', (req, res) => {
    // register user info to DB
    const user = new User(req.body)

    user.save((err, doc) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({success: true})
    })
})

app.listen(port, () => console.log(`Listening on port ${port}...`))