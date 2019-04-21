import { MongoClient, Db } from 'mongodb'; // eslint-disable-line no-unused-vars

class Database {

	private host: string;
	private port: number;
	private dbname : string;

	constructor() {
		this.host = 'localhost';
		this.port = 27017;
		this.dbname = 'sexus';
	}

	public async connect(): Promise<Db> {
		try {
			return MongoClient.connect(`mongodb://${this.host}:${this.port}`, { useNewUrlParser: true }).then(client => client.db(this.dbname));
		} catch (err) {
			console.log(`Error in connect database ${err}`);
			return err;
		}
	}
}
const connection = new Database();

let instance: any = async () => connection.connect();

instance = instance().then((db: any) => {
	return db;
});

class Apdapter {
	private db: Db;
	constructor() {
		this.db = instance;
	}
	public getInstance() {
		return this.db;
	}
}

export const db = new Apdapter().getInstance();

async function getUsers() {
	const users = await db.collection('users').find({}).toArray();
	console.log(users);
}

getUsers();
