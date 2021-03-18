//Created by Luis David Gallegos Godoy & Jorge Alejandro Dong Llauger
//Date: 07/03/2021

// definimos un puerto por el cual escucharemos peticiones
const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || "0.0.0.0"

const cors = require('cors')

require('dotenv').config();

const express = require("express");
const app = express();
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const toneAnalyzer = new ToneAnalyzerV3({
    version: '2021-17-03',
    authenticator: new IamAuthenticator({
      apikey: process.env.TONE_ANALYZER_IAM_APIKEY || 'type-key-here',
    }),
    url: process.env.TONE_ANALYZER_URL,
  });
    
// configuraciones para nuestro server
const corsOptions = { origin: '*', optionsSuccessStatus: 200 }
app.use(cors(corsOptions))

//Manda un saludo general en la url origen
app.get('/', function (req, res) {
  	res.send('Saludos desde express');
});

//Metodo post del api de toneAnalyzer
app.post('/api/toneAnalyzer', async function(req, res, next) {
    try {
      const { result } = await toneAnalyzer.tone(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  });


app.listen(PORT,HOST, () => { console.log(`Server listening on port ${PORT} and host ${HOST}`); })