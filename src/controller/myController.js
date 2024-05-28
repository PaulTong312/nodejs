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
    return res.render("crud.ejs");
}

let postCRUD = async (req, res) => {
    let message = await CRUDservice.createUser(req.body);
    console.log(message);
    return res.send("Post CRUD from server");
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser();
    console.log('--------------------------');
    console.log(data);
    console.log('--------------------------');
    return res.render("displayCRUD.ejs", {
        dataTable: data
    });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if(userId){
        let userData = await CRUDservice.getUserInfoById(userId);

        return res.render("editCRUD.ejs", {
            user: userData
        })
    }
    else{
        return res.send("User not found");
    }

}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDservice.updateUserData(data);
    return res.render("displayCRUD.ejs", {
        dataTable: allUsers,
    });
}


module.exports = {
    helloWorld: helloWorld,
    html: html,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,

}