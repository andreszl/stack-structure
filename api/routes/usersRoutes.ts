import { Router } from 'express';
import { usersController } from '../controllers/users.controller';

class UsersRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', usersController.index);
        this.router.post('/', usersController.save)
        this.router.get('/:id', usersController.findById);
        this.router.get('/login/:name', usersController.login)
    }
}

const usersRoutes = new UsersRoutes();

export default usersRoutes.router;