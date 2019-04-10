import { Router } from 'express';
import { usersController } from '../controllers/users.controller';

class UsersRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.post('/', usersController.save)
        this.router.get('/', usersController.index);
        this.router.get('/:id', usersController.findById);
        this.router.post('/login', usersController.login)
    }
}

const usersRoutes = new UsersRoutes();

export default usersRoutes.router;