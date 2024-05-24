import db from '../models/index.js'

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

module.exports = {
    helloWorld: helloWorld,
    html: html
}