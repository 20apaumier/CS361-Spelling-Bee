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
    origin: "20apaumier.github.io/CS361-Spelling-Bee/",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use('/', require('./routes/authRoutes'))
app.use('/', require('./routes/statsRoutes'))

app.get("/*", function (req, res) {
    res.sendFile(
        path.join(__dirname, "../spelling-bee/build/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port: ${port}`));