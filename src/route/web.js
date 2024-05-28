import express from "express";
import myController from "../controller/myController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", myController.helloWorld);
    router.get("/html", myController.html);

    router.get("/crud", myController.getCRUD);
    router.post("/post-crud", myController.postCRUD);
    router.get("/get-crud", myController.displayGetCRUD);
    router.get("/edit-crud", myController.getEditCRUD);
    router.post("/put-crud", myController.putCRUD);
    router.get("/delete-crud", myController.deleteCRUD);
    return  app.use("/", router)
}

module.exports = initWebRoutes;