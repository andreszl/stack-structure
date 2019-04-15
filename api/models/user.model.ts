import db from '../data/db.conn';

import User from './interfaces/user.interface';

class UserModel {

	public static index(): Promise<Function> {
		try {
			return new Promise((resolve: Function): void => {
				db.find({}, (err: Error, users: Record<string, User>): void => {
					if (err) {
						throw err;
					}
					resolve(users);
				});
			});
		} catch (err) {
			throw err;
		}
	}

	public static findUserByName(name: string): Promise<Function> {
		try {
			return new Promise((resolve: Function): void => {
				db.find({ name }, (err: Error, user: Record<string, User>): void => {
					if (err) {
						throw err;
					}
					resolve(user);
				});
			});
		} catch (err) {
			throw err;
		}
	}

	public static findUsersByName(name: string): Promise<Function> {
		try {
			const regexString: string = `${name}`;
			const regex: RegExp = new RegExp(regexString);
			return new Promise((resolve: Function): void => {
				db.find(
					{ name: { $regex: regex } },
					(err: Error, user: Record<string, User>): void => {
						if (err) {
							throw err;
						}
						resolve(user);
					},
				);
			});
		} catch (err) {
			throw err;
		}
	}


	public static save(user: object): Promise<Function> {
		return new Promise((resolve: Function): void => {
			try {
				db.insert(user, (err, info): void => {
					if (err) {
						throw err;
					}
					resolve(info);
				});
			} catch (err) {
				throw err;
			}
		});
	}

	public static find(): Promise<Function> {
		try {
			return new Promise((resolve: Function): void => {
				db.find({}, (err: Error, users: Record<string, User>): void => {
					if (err) {
						throw err;
					}
					resolve(users);
				});
			});
		} catch (err) {
			throw err;
		}
	}

	public static findById(id: string): Promise<Function> {
		try {
			return new Promise((resolve: Function): void => {
				db.find({ _id: id }, (err: Error, user: Record<string, User>): void => {
					resolve(user);
				});
			});
		} catch (err) {
			throw err;
		}
	}
}

export default UserModel;
