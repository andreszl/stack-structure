import db from '../database/db.conn';
import nedb from '../data/db.conn';

class UserModel {

	public static async getAll() {
		try {
			const users = await db.then(conn => conn.collection('users').find({}).toArray());
			return users;
		} catch (err) {
			throw err;
		}
	}

	public static index(): Promise<Function> {
		try {
			return new Promise((resolve: Function): void => {
				nedb.find({}, (err: Error, users: Record<string, object[]>): void => {
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
				nedb.find({ name }, (err: Error, user: Record<string, object[]>): void => {
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
				nedb.find(
					{ name: { $regex: regex } },
					(err: Error, user: Record<string, object[]>): void => {
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
				nedb.insert(user, (err, info): void => {
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
				nedb.find({}, (err: Error, users: Record<string, object[]>): void => {
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
				nedb.find({ _id: id }, (err: Error, user: Record<string, object[]>): void => {
					resolve(user);
				});
			});
		} catch (err) {
			throw err;
		}
	}
}

export default UserModel;
