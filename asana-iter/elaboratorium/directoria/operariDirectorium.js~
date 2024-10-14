const express = require('express');
const functiones = require('../functiones/operariPactumFunctiones');
const directorium = express.Router();
const cookieParser = require("cookie-parser");
const path = require("path")
const basis = 'operari';
require('dotenv').config();
directorium.use(cookieParser(process.env.COOKIE_SECRET))

directorium.get(`/${basis}`, functiones.operari);
//pâgina quô imus cum ûsuârium cônâtur agnoscî tesserâ
//hic advenîre est per sê stimulus petendî per POST signum agnitiônis
//quod facilius est animadvertere quam data rêtiâlia adventûs ad Asanâ praestitutam pâginam

module.exports = directorium;
