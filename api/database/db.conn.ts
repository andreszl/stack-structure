import { MongoClient, Db } from 'mongodb'; // eslint-disable-line no-unused-vars
import { isEmpty } from 'lodash';

class Database {
	private host : string;
	private port : number;
	public dbname : string;
	public connection ?: MongoClient;


	constructor() {
		this.host = 'localhost';
		this.port = 27017;
		this.dbname = 'test';
	}

	public async getInstance() {
		try {
			if (isEmpty(this.connection)) {
				await this.connect();
			}
			if (this.connection !== undefined) {
				return this.connection.db(this.dbname);
			}
			throw Error;
		} catch (error) {
			console.log(`Error get database ${error}`);
			throw error;
		}
	}

	public async connect() {
		try {
			this.connection = await MongoClient.connect(`mongodb://${this.host}:${this.port}`, { useNewUrlParser: true });
		} catch (error) {
			console.log(`Error in connect database ${error}`);
		}
	}

	public disconnect() {
		try {
			if (this.connection !== undefined) {
				this.connection.close();
			}
		} catch (error) {
			console.log(`Error in desconnect database ${error}`);
		}
	}
}

export default new Database().getInstance() as Promise<Db>;
