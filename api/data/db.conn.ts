import config from 'config';
import Datastore from 'nedb';

const db = new Datastore({ filename: `${config.get('data')}/users.db`, timestampData: true, autoload: true });

export default db;
