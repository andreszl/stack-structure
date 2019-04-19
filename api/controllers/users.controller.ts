import { Request, Response } from 'express'; // eslint-disable-line no-unused-vars
import jwt from 'jsonwebtoken';

import { graphql } from 'graphql';
import { modules } from '../graphql';
import UserModel from '../models/user.model';

class UsersController {

	public async index(req: Request, res: Response): Promise<void> {
		try {
			const { schema, context } = modules;
			const fields = '{users{id, name, role, status, createdAt, updatedAt}}';
			const { data } = await graphql(schema, `${fields}`, context);
			res.json(data.users);
		} catch (err) {
			throw err;
		}
	}

	public async login(req: Request, res: Response): Promise<void> {
		try {
			const user = await UserModel.findUserByName(req.body.username);
			if (user[0]) {
				if (user[0].password === req.body.password) {
					const token = jwt.sign({
						id: user[0].id,
						name: user[0].name,
						role: user[0].role,
					}, 'secret');
					res.json({ token });
				} else {
					res.status(401).json({ errors: { form: 'invalid credentials' } });
				}
			} else {
				res.status(401).json({ errors: { form: 'invalid credentials' } });
			}
		} catch (err) {
			throw err;
		}
	}

	public async save(req: Request, res: Response): Promise<void> {
		try {
			const user: { name: string; role: string; status: boolean } = {
				name: req.body.name,
				role: req.body.role,
				status: false,
			};

			const result = await UserModel.findUserByName(user.name);

			if (result.length >= 1) {
				res.json(result);
			} else {
				const info = await UserModel.save(user);
				res.status(200);
				res.json(info);
			}
		} catch (err) {
			throw err;
		}
	}

	public async findById(req: Request, res: Response): Promise<void> {
		try {
			const user = await UserModel.findById(req.params.id);
			res.json(user);
		} catch (err) {
			throw err;
		}
	}

	public async verify(req: Request, res: Response): Promise<void> {
		try {
			const bearerHeader = req.headers.authorization;
			if (typeof bearerHeader !== 'undefined') {
				const bearer = bearerHeader.split(' ');
				const bearerToken = bearer[1];
				const token = bearerToken;
				jwt.verify(token, 'secret', (err: Error, authData): void => {
					if (err) {
						res.sendStatus(403);
					} else {
						res.json({ access: true, authData });
					}
				});
			} else {
				res.sendStatus(403);
			}
		} catch (err) {
			throw err;
		}
	}
}

export default UsersController;
