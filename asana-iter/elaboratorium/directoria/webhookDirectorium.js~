const express = require('express');
const functiones = require('../functiones/webhookPactiFunctiones');
const directorium = express.Router();
const basis = 'webhook';

directorium.get(`/${basis}/accipere-webhook`, functiones.accipereWebhook);

module.exports = directorium;
