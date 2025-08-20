const express = require("express");
const app = express();
app.use(express.json());

const connect = require("./Database/dbConnection");

const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const authRoutes = require("./Routes/AuthRoutes");
const userRouter = require("./Routes/UserRouter");

app.use("/auth", authRoutes);
app.use("/user", userRouter);

connect()
    .then(() => {
        console.log("Database success");
        app.listen(process.env.PORT || 3006, () => {
            console.log("Server success");
        })
    })
    .catch((err) => {
        console.log(err);
    });