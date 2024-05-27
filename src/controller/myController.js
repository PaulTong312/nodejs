import db from '../models/index.js'
import CRUDservice from '../service/CRUDservice.js'

let helloWorld = (req, res) => {
    return res.send("Hello world with PaulTong")
}

let html = async (req, res) => {
    try{
        let data = await db.User.findAll();
        
        return res.render("myPage.ejs", {
            data: JSON.stringify(data)
        })

    }catch(e){
        console.log(e);
    }
    
}

let getCRUD = async (req, res) => {
    res.render("crud.ejs");
}

let postCRUD = async (req, res) => {
    let message = await CRUDservice.createUser(req.body);
    console.log(message);
    return res.send("Post CRUD from server");
}

module.exports = {
    helloWorld: helloWorld,
    html: html,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
}