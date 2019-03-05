import { Request, Response } from "express";
import Users from '../observers/Users'
import UserModel from '../models/user.model'

class UsersController {
    
    public async index(req: Request, res: Response): Promise<void> {
        try{     
            UserModel.index(function(users){
                res.json(users)
            });    
        }catch(err){
            console.log(err)
        }
    } 
    
    public async login(req: Request, res: Response): Promise<void> {
        try{     
            let name = req.params.name
            UserModel.findByName(name, function(user){
                res.json(user)
            });    
        }catch(err){
            console.log(err)
        }
    } 


    public async save(req: Request, res: Response): Promise<void> {
        try{     
            let user = {
                name: req.body.name,
                role: req.body.role,
                status: false
            }

            let name = user.name;
            UserModel.findByName(name, (user) => {
                if(user.length >= 1){
                    res.status(400)     
                    res.json('error')         
                }else{                  
                    UserModel.save(user, (userSuccess) => {
                        let newUser = new Users(userSuccess._id, userSuccess.name, userSuccess.role, userSuccess.status)
                        newUser.notify();
                        res.status(200)
                        res.json(userSuccess)
                    })
                }
            });              
        }catch(err){
            console.log(err)
        }
    }  

    public async findById(req: Request, res: Response): Promise<void> {
        try{     
            let id = req.params.id
            UserModel.findById(id, function(user){
                res.json(user)
            });    
        }catch(err){
            console.log(err)
        }
    } 
}

export const usersController = new UsersController();