/**immutabiles instrumenta ====================================================================================
*      _    _____ ____      _    _____   ___ __  __ __  ____     _______  _    ____ ___ _     _____ ____
*     / \  | ____|  _ \    / \  | ____| |_ _|  \/  |  \/  \ \   / /_   _|/ \  | __ )_ _| |   | ____/ ___|
*    / _ \ |  _| | |_) |  / _ \ |  _|    | || |\/| | |\/| |\ \ / /  | | / _ \ |  _ \| || |   |  _| \___ \
*   / ___ \| |___|  _ <  / ___ \| |___   | || |  | | |  | | \ V /   | |/ ___ \| |_) | || |___| |___ ___) |
*  /_/   \_\_____|_| \_\/_/   \_\_____| |___|_|  |_|_|  |_|  \_/    |_/_/   \_\____/___|_____|_____|____/
*
*/

// Insturmentorum indices
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios")
const path = require("path")
const repositorium = require('../../repositorium_datorum/repositorium');
const Asana = require('asana');
const fs = require('fs')
require('dotenv').config();

// Data
const VERVM = true;
const FALSVM = false;
exports.responsum = (petitum, responsum) =>
{
	console.log(petitum.query.state)
	if(petitum.query.state !== petitum.signedCookies.statusOauth)
	{
		responsum.status(422).send("Stat&#363;s n&#333;n &#299;dem sunt");
		return;
	}
	else
	{
	console.log("*** Tessera permutanda eA openauthentication et status responsI agnitiOnis usuariI:\n"
	)
	
	//TERMPORALIA: Nam Double Sending Cookie Faciendum
	//fs.writeFileSync("oidc.dat", petitum.query['id_token']);	
	let tessera = petitum.query.code
	//responsum.redirect(`../oauth/salvare-oauth/?code=${tessera}`);

	responsum.sendFile(path.join(__dirname, "../..","static/html/mongoDBPQSME.html"))
	}
};

exports.rectumPQSME = (petitum, responsum) =>
{
	console.log("RECTE probavisti quem dixisti te esse")
	let tessera = petitum.query.code
	responsum.redirect(`../salvare-oauth/?code=${tessera}`);
}
exports.salvareOauth = async (petitum, responsum) =>
{

	console.log("salvare")
	const repoDatorum = await repositorium.utiRepositorio()
	const usuarii = await repoDatorum.consequiCongeriem('usuarii')
	const usuariusMongo = await usuarii.findOne({signum_usuarii:"trioCivisII"});
	//response.status(200)
	//return;
	const materia =
	{
		grant_type: "authorization_code",
		client_id: process.env.CLIENT_ID,
		client_secret: usuariusMongo.tacendum_usuarii,
		redirect_uri: process.env.REDIRECT_URI,
		code: petitum.query.code,
	}
	const constitutio =
	{
		headers:
		{
			"content-type": "application/x-www-form-urlencoded"
		}
	}
	axios
	.post("https://app.asana.com/-/oauth_token", materia, constitutio)
	.then((responsum) =>
	{
		console.log("OAuth tessera nObIs\n")
		return responsum.data
	})
	.then( async (data) =>
	{
		//TEMPORALIA: melius est servâre in repositôriô datôrum

		let client = Asana.ApiClient.instance;
		let token = client.authentications['token'];
		token.accessToken = data.access_token;
		usuarii.updateOne({signum_usuarii:"trioCivisII"}, {$set: {aditusclavis: data.access_token}})
		usuarii.updateOne({signum_usuarii:"trioCivisII"}, {$set: {novusaditus: data.refresh_token}})
		//responsum.redirect(`../access_token=${data.access_token}`);
		responsum.redirect('../../operari/')
	}).catch((error) =>
	{
		console.log(error.message);
	});
};

//creatur pagina secunda qua status generatur 

exports.agnoscere = (petitum, responsum) =>
{
	let statusOauth = uuidv4();
	//Status servâtur inter aerâs rêtiâlês ut rursum ûsuârium eô ûtâtur
	//Sîc facilius constitutur aetâs aerae ipsîus
	//Quârê utendum êlaboratrum rêtiâle
	responsum.cookie("statusOauth", statusOauth,
	{
		maxAge: 1000*60*5,
		signed: VERVM
	});
	//statu oauth creato, adimus ad paginam agnitiônis Asana

	//	responsum.redirect(`https://app.asana.com/-/oauth_authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=openid%20email%20profile%20default%20identity&state=${statusOauth}`)

	responsum.redirect(`https://app.asana.com/-/oauth_authorize?response_type=code%20id_token&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=openid%20email%20profile%20default%20identity&state=${statusOauth}`)

}


exports.permittereAgnoscere = (petitum, responsum) =>
{
	responsum.sendFile(path.join(__dirname, "../../html","index.html"));
};
