//Llama a dotenv para poder usar la url de la base de datos de mongodb y asi poder manipular los documentos.
const dotenv = require('dotenv');
const MongoClient = require('mongodb').MongoClient;
dotenv.config();

let _db;

const initDb = (callback) => {
    if (_db) {
        console.log('bd  está lista!');
        return callback(null, _db);
    }

    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            _db = client;
            callback(null, _db);
        })
        .catch((err) => {
            callback(err);
        });
};
  
const getDb = () => {
    if (!_db) {
        throw Error('Bd no inicializada');
    }
    return _db;
};
  
module.exports = { initDb, getDb };