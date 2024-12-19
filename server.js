const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 3010;
const connectDB = require('./config/db');
connectDB();
const app = express();

app.use(cors({
    origin: [`http://localhost:${process.env.PORT}`,'http://localhost:3000' ],
    credentials: true
}));
//Static folder
app.use(express.static(path.join(__dirname, 'public')))
//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (rec, res) => {
    res.send('hello there!');
});

const ideasRouter = require('./routes/ideas');
app.use('/api/ideas', ideasRouter);

app.listen(port, () => console.log(`Server listening on port ${port}`));
