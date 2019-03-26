import { Request, Response } from "express";
import UserModel from '../models/user.model'

class UsersController {
    
    public async getAlluser( req: Request , res : Response){
        try{
            // let users = await UserModel.getAlluser();
            // res.json(users);
        }catch(error){
            console.log(error);
        }
    }
}

export const usersController = new UsersController();