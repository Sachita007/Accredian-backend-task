const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const referRouter = require("./routes/referral")
const errorHandler = require('./Controllers/errorHandler')
const morgan = require('morgan')
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3000;
// setup the logger
app.use(morgan('combined'))

app.use(bodyParser.json());

// Endpoint to handle referral form submission
app.use("/api/referrals", referRouter)

app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
