import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

// database connection
import "./config/db.js";

// import routes
import authRoute from "./route/auth.js";
import userRoute from "./route/user.js";
import bookRoute from "./route/book.js";

dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.json({ limit: "3mb", extended: true }));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/book", bookRoute);

// Enable CORS for API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.listen(process.env.PORT, () => {
    console.log(`This server is on port: ${process.env.PORT}`);
})