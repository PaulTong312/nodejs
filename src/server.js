import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";   
import initWebRoutes from "./route/web";
import conectDB from "./config/connectDB";
require("dotenv").config();

let app = express();

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);
conectDB();


let port = process.env.PORT || 6969;
app.listen(port, () => {
    console.log(`App is running at the port ${port}`);
})