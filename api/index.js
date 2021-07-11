const express = require("express");
const app = express();
const cors = require("cors");
// const dotenv = require("dotenv").config();
const morgan = require("morgan");
const helmet = require("helmet");
const connectDB = require("./DB/dbConfig");
const authRouter = require("./routes/authRoute");
const ticketRouter = require("./routes/ticketsRoute");
const tokenRouter = require("./routes/tokensRoute");



const port = process.env.PORT || 5000;

connectDB();
 
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(morgan("tiny"));
app.use(cors());

app.use("/api/auth",authRouter);
app.use("/api/tickets",ticketRouter);
app.use("/api/tokens",tokenRouter);


app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`);
})
