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

	public static async index(): Promise<Nedb.Cursor<{}>> {
		try {
			const users = await nedb.find({});
			return users;
		} catch (err) {
			throw err;
		}
	}

	public static async findUserByName(name: string): Promise<Nedb.Cursor<{}>> {
		try {
			const users = await	nedb.find({ name });
			return users;
		} catch (err) {
			throw err;
		}
	}

	public static async findUsersByName(name: string): Promise<Nedb.Cursor<{}>> {
		try {
			const regexString: string = `${name}`;
			const regex: RegExp = new RegExp(regexString);
			const users = await nedb.find({ name: { $regex: regex } });
			return users;
		} catch (err) {
			throw err;
		}
	}


	public static save(user: object): void {
		try {
			nedb.insert(user);
		} catch (err) {
			throw err;
		}
	}

	public static async find(): Promise<Nedb.Cursor<{}>> {
		try {
			const users = nedb.find({});
			return users;
		} catch (err) {
			throw err;
		}
	}

	public static async findById(id: string): Promise<Nedb.Cursor<{}>> {
		try {
			const user = await nedb.find({ _id: id });
			return user;
		} catch (err) {
			throw err;
		}
	}
}

export default UserModel;
