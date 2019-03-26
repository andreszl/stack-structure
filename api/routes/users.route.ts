import { Router } from 'express';
import { usersController } from '../controllers/users.controller';

class UsersRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', usersController.getAlluser);
    }
}

const usersRoutes = new UsersRoutes();

export default usersRoutes.router;