import { Router } from 'express';
import UsersController from '../controllers/users.controller';

class UsersRoutes {
	public router: Router = Router();
	public usersController: UsersController;

	constructor() {
		this.usersController = new UsersController();
		this.config();
	}

	config(): void{
		this.router.get('/getAllUsers', this.usersController.getAllUsers);
		this.router.get('/', this.usersController.index);
		this.router.get('/:id', this.usersController.findById);
		this.router.post('/', this.usersController.save);
		this.router.post('/login', this.usersController.login);
		this.router.post('/verify', this.usersController.verify);
	}
}

export default new UsersRoutes().router;
