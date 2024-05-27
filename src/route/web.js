import express from "express";
import myController from "../controller/myController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", myController.helloWorld);
    router.get("/html", myController.html);
    router.get("/crud", myController.getCRUD);
    router.post("/post-crud", myController.postCRUD);

    return  app.use("/", router)
}

module.exports = initWebRoutes;