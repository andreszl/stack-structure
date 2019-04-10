import { Request, Response } from "express";
import UserModel from '../models/user.model'
import { graphql } from 'graphql'
import { modules } from '../graphql'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

class UsersController {
    
    public async index(req: Request, res: Response): Promise<void> {
        try{     
            let { schema, context } =  modules;
            let { data } = await graphql(schema,`{users{id, name, role, status, createdAt, updatedAt}}`,context)
            res.json(data.users)
        }catch(err){
            console.log(err)
        }
    } 
    
    public async login(req: Request, res: Response): Promise<void> {
        try{ 
            let user: any = await UserModel.findUserByName(req.body.username); 
            if(user[0]){               
                if(user[0].password == req.body.password){
                    const token = jwt.sign({
                        id: user[0].id,
                        name: user[0].name
                    }, 'secret')
                    res.json({token})
                }else{
                    res.status(401).json({errors: {form: 'invalid credentials'} })
                }
            }else{
                res.status(401).json({errors: {form: 'invalid credentials'} })                
            }   
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
            let result : any = await UserModel.findUserByName(name)

            if(result.length >= 1){
                res.json(result)       
            }else{                  
                // UserModel.save(user, (userSuccess) => {
                //     res.status(200)
                //     res.json(userSuccess)
                // })
            }           
        }catch(err){
            console.log(err)
        }
    }  

    public async findById(req: Request, res: Response): Promise<void> {
        try{     
            let id = req.params.id
            let user = await UserModel.findById(id);
            res.json(user)    
        }catch(err){
            console.log(err)
        }
    } 


}

export const usersController = new UsersController();