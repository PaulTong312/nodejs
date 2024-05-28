
import bcrypt from 'bcryptjs';
import db from '../models/index';
import { raw } from 'body-parser';
import { where } from 'sequelize';
const salt = bcrypt.genSaltSync(10);

let createUser = async (data) => {
    return new Promise( async (resolve, reject) => {
        try{
            let hashPasswordForm = await hashPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordForm,
                firstName:data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === "1" ? true : false,
                roleId: data.roleId,
            })

            resolve('create user success');
        }catch(e){
            reject(e);
        }


    })
}

let hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        try{
            let hash = bcrypt.hashSync(password, salt);
            resolve(hash);
        }catch(e){
            reject(e);
        }
    })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try{
            let users = await db.User.findAll({
                raw: true,
            });
            resolve(users);
        }catch(e){
            reject(e);
        }
    });
}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: {id: userId},
                raw: true,
            });
            if(user){
                resolve(user);
            }
            else{
                resolve({});
            }
        }catch(e){
            reject(e);
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: {id: data.id},
            })
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            }else{
                resolve();
            }

        }catch(e){
            reject(e);
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: {id: userId},
            })
            if(user){
                await user.destroy();
                resolve('delete user success');
            }
            else{
                resolve('delete user failed');
            }
            
        }catch(e){
            reject(e);
        }
    })
}

module.exports = {
    createUser: createUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,

}

