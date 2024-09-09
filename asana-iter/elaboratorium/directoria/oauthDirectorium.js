const express = require('express');
const functiones = require('../functiones/oauthPactumFunctiones');
const directorium = express.Router();
const cookieParser = require("cookie-parser");
const basis = 'oauth';
require('dotenv').config();
directorium.use(cookieParser(process.env.COOKIE_SECRET))

directorium.get(`/${basis}`, functiones.permittereAgnoscere);
//pâgina quô imus cum ûsuârium cônâtur agnoscî tesserâ
//hic advenîre est per sê stimulus petendî per POST signum agnitiônis
//quod facilius est animadvertere quam data rêtiâlia adventûs ad Asanâ praestitutam pâginam

directorium.get(`/${basis}/agnoscere`, functiones.agnoscere);
directorium.get(`/${basis}/responsum`, functiones.responsum);
directorium.get(`/${basis}/tessera-mea`, functiones.tesseraMea);


module.exports = directorium;
