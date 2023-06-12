// websockets server
const axios = require("axios");
const io = require("socket.io")(10000, {
  cors: {
    origin: '*'
  }
});

console.log("Servidor WS iniciado na porta 10000");

io.on('connection', (socket) => {
  console.log(socket.id + ' user connected');
  axios.request('http://localhost:4000/palavra').then((response) => {
      console.log(response.data);

      socket.nchar = response.data.word.length;
      socket.word = response.data.word.toLowerCase();
      socket.temptatives = socket.nchar+3;
      socket.state = `[_${",_".repeat(socket.nchar-1)}]`;

      socket.emit('init',
      { 
          'word': socket.state + ',' + socket.temptatives, 
          'hint': response.data.hint
      });
  });

  socket.on('temptative', (msg) => {
      temptative = msg.char.toLowerCase();
      positions = [];
      i = -1;
      while((i=socket.word.indexOf(temptative,i+1)) >= 0) positions.push(i);
      //console.log(positions);

      if (positions.length == 0) { socket.temptatives--; }
      else { 
          positions.forEach(position => {
              socket.state = socket.state.substring(0, 2*position+1) + temptative + socket.state.substring(2*position+2);
          });
      }
      //console.log({'word': socket.state + ',' + socket.temptatives});
      socket.emit('word', {'word': socket.state + ',' + socket.temptatives});
  });

  socket.on('error', (err) =>
      console.log(err)
  );

  socket.on('disconnect', () =>
      console.log('Connection with' + socket.id + ' closed')
  );
})

// rest server
var express     = require('express')
var app         = express();
var bodyParser  = require('body-parser');
const cors = require('cors');
const db = require('./database');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors({
  origin: '*'
}));

app.get('/palavra', async (_, res) => {
  const result = await db.getOneRandom();
  res.status(200).json(result);
})

app.get('/lista', async (_, res) => {
  const results = await db.getAll();
  res.status(200).json(results);
})

app.post('/add', async (req, res) => {
  console.log(req.body);
  const word = {word: req.body.word, hint: req.body.hint}
  await db.insertOne(word);
  res.status(200).json(word);
})

app.post('/remove', async (req, res) => {
  console.log(req.body);
  const word = await db.deleteOne(req.body.id);
  res.status(200).json(word);
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