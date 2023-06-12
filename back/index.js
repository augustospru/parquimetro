// rest server
var express     = require('express')
var app         = express();
var bodyParser  = require('body-parser');
var MongoDB = require('mongodb');
const cors = require('cors');
const db = require('./database');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors({
  origin: '*'
}));

app.get('/OneRandom', async (_, res) => {
  const result = await db.getOneRandom();
  console.log(result.dataIni)
  console.log(new Date((new MongoDB.Timestamp(result.dataIni)).getHighBits() * 1000))
  res.status(200).json(result);
})

app.get('/lista', async (_, res) => {
  const results = await db.getAll();
  res.status(200).json(results);
})

app.post('/add', async (req, res) => {
  console.log(req.body);
  const register = {dataIni: MongoDB.Timestamp.fromString(req.body.dataIni), dataFin: MongoDB.Timestamp.fromString(req.body.dataFin)}
  await db.insertOne(register);
  res.status(200).json(register);
})

app.post('/remove', async (req, res) => {
  console.log(req.body);
  const register = await db.deleteOne(req.body.id);
  res.status(200).json(register);
})

app.get(/^(.+)$/, function (req, res) {
  try {
    res.status(404).write("Not found")
    res.end();
  }
  catch(e)
  {
    res.end();
  }    
})

app.listen(4000, function(){
  console.log('Servidor iniciado na porta 4000');
});