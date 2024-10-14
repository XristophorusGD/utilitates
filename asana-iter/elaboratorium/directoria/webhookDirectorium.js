const express = require('express');
const functiones = require('../functiones/webhookPactiFunctiones');
const directorium = express.Router();
const basis = 'emissio';
const bodyParser = require('body-parser');
directorium.use(bodyParser.json())

directorium.post(`/${basis}/immissio`, functiones.accipereWebhook);

module.exports = directorium;
