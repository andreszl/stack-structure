import config from 'config'

var Datastore = require('nedb')
var db = new Datastore();

db = {};
db.users = new Datastore({ filename: `${config.get('data')}/users.db`,timestampData: true, autoload: true});

export default db
