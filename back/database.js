const {MongoClient, ObjectId} = require('mongodb');

const uri = "mongodb+srv://augustospru:SnpIWr4XznyqkITB@parquimetro.hfmepsm.mongodb.net/Parquimetro?retryWrites=true&w=majority";

let singleton;

async function connect() {
    if (singleton) return singleton;
    const client = new MongoClient(uri);
    await client.connect();
    singleton = client.db(process.env.MONGO_DATABASE);
    return singleton;
}

async function getAll() {
    const db = await connect();
    return await db.collection("Parquimetro").find().toArray();
}

async function getOneRandom() {
    const db = await connect();
    const results = await db.collection("Parquimetro").find().toArray();
    const count = await db.collection("Parquimetro").count()
    const rng = Math.floor(Math.random() * count)
    return results[rng];
}

async function insertOne(register) {
    const db = await connect();
    return await db.collection("Parquimetro").insertOne(register);
}

async function deleteOne(id) {
    const db = await connect();
    return db.collection("Parquimetro").deleteOne({ _id: new ObjectId(id) });
}

module.exports = {getAll, getOneRandom, insertOne, deleteOne};
