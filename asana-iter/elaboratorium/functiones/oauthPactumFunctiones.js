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
require('dotenv').config();

// Data
const VERVM = true;
const FALSVM = false;
exports.tesseraMea = (petitum, responsum) =>
{
	if (petitum.cookies.access_token)
	{
		const config =
		{
			headers:
			{
			Authoirzation: "Signfer" + petitum.cookies.access_token
			}
		}
		axios
		.get("https://app.asana.com/api/1.0/users/me?opt_pretty=true", config)
		.then((responsum) => responsum.data)
		.then((descritpioUsuarii) =>
		{
			console.log("*** Responsum /users//me:\n")
			console.log(JSON.stringify(descriptioUsuarii, null, 2))
			responsum.json(descriptioUsuarii)
		});
	}else
	{
	//TEMPORALIA: melius scrîbere responsum conditiônî errôris 401 (sine auctoritate)
	//Potes ûtî axios interceptores
		responsum.redirect("/");
	}
};



exports.responsum = (petitum, responsum) =>
{
	if(petitum.query.state !== petitum.signedCookies.statusOauth)
	{
		responsum.status(422).send("Stat&#363;s n&#333;n &#299;dem sunt");
		return;
	}

	console.log(
	"****** Tessera permutanda tesser\u0101 open authentication et status responsî agnitiônis usuarii:\n"
	)

	console.log(`tessera: ${petitum.query.code}`)
	console.log(`status: ${petitum.query.state}\n`)

	const materia =
	{
		grant_type: "authorization_code",
		client_id: process.env.CLIENT_ID,
		client_secret:"",
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
		console.log("Responsum conâtui permutandî signa\n")
		console.log(responsum.data)
		return responsum.data
	})
	.then((data) =>
	{
		//TEMPORALIA: melius est servâre in repositôriô datôrum
		responsum.cookie("access_token", data.access_token, { maxAge: 60*60*1000});
		responsum.cookie("refresh_token", data.refresh_token,
		{
			httpOnly: VERVM,
			secure: VERVM
		});

		responsum.redirect(`/access_token=${data.access_token}`);
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
	responsum.redirect(`https://app.asana.com/-/oauth_authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&state=${statusOauth}`);
}


exports.permittereAgnoscere = (petitum, responsum) =>
{
	responsum.sendFile(path.join(__dirname, "index.html"));
};
