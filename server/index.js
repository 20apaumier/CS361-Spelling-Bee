const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { mongoose } = require('mongoose');
const app = express();
const cookierParser = require('cookie-parser')

// database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database Connected'))
.catch((err) => console.log("Database not connected", err))

// middleware
app.use(express.json())
app.use(cookierParser())
app.use(express.urlencoded({extended: false}))
app.use(cors({
    origin: "cs-361-spelling-ku55cwei3-ajs-projects-178b9a17.vercel.app",
    credentials: true
}));

app.use('/', require('./routes/authRoutes'))
app.use('/', require('./routes/statsRoutes'))

const port = 8000;
app.listen(port, () => console.log(`Server is running on port: ${port}`));