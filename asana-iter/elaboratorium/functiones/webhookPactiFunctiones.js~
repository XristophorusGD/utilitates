/* Architectus adnotationes
*immutabiles instrumenta ====================================================================================
 *      _    _____ ____      _    _____   ___ __  __ __  ____     _______  _    ____ ___ _     _____ ____
 *     / \  | ____|  _ \    / \  | ____| |_ _|  \/  |  \/  \ \   / /_   _|/ \  | __ )_ _| |   | ____/ ___|
 *    / _ \ |  _| | |_) |  / _ \ |  _|    | || |\/| | |\/| |\ \ / /  | | / _ \ |  _ \| || |   |  _| \___ \
 *   / ___ \| |___|  _ <  / ___ \| |___   | || |  | | |  | | \ V /   | |/ ___ \| |_) | || |___| |___ ___) |
 *  /_/   \_\_____|_| \_\/_/   \_\_____| |___|_|  |_|_|  |_|  \_/    |_/_/   \_\____/___|_____|_____|____/
 */

const crypto = require('crypto')
const bodyParser = require('body-parser');
const VERVM = true;
const FALSVM = false;
//const asanaElaboratio = require('../../asana_elaboratio.js');
const repositorium = require('../../repositorium_datorum/repositorium');

/*
 *  ____ __ __ __  __   ___ ______ __   ___
 * ||    || || ||\ ||  //   | || | ||  // \\
 * ||==  || || ||\\|| ((      ||   || ((   ))
 * ||    \\_// || \||  \\__   ||   ||  \\_//
 *
 * *******************************************
 * Title: accipereWebhook
 * Descriptio: comprobat institutiônem prîmam êmissiônis ab êlaborâtôriône Asana VEL
 * probat an vêrê emissa sequentia ex êlaborâtôriô Asana mitterentur
 * Intus:
 * 	(o) petitum   - data petita ûsuâriô 
 * 	(o) responsum - data mittenda ad ûsuârium
 * Exitus: nil
 */
exports.accipereWebhook = async (petitum, responsum) =>
{
//Condere emissionem ab elaboratorio Asanae
	if (petitum.headers["x-hook-secret"])
	{
		console.log("Nova emissio elaboratorii Asana")
                const repoDatorum = await repositorium.utiRepositorio()
		const arces = await repoDatorum.consequiCongeriem('arx')
		arces.updateOne({signum_usuarii:"trioCivisII"}, {$set: {tessera_x_hook: petitum.headers["x-hook-secret"]}})
		responsum.setHeader("X-Hook-Secret", petitum.headers["x-hook-secret"])
		responsum.status(200).send('OK');
		//Accipere emissionem ab elaboratorio Asanae
	}
	else if (petitum.headers["x-hook-signature"])
	{
                const repoDatorum = await repositorium.utiRepositorio()
		const arces = await repoDatorum.consequiCongeriem('arx')
		const usuariusMongo = await arces.findOne({signum_usuarii:"trioCivisII"});

		const tesseraComputata = crypto
			.createHmac("SHA256", usuariusMongo["tessera_x_hook"])
			.update(JSON.stringify(petitum.body))
			.digest("hex")
		if (!crypto.timingSafeEqual(
			Buffer.from(petitum.headers["x-hook-signature"]),
			Buffer.from(tesseraComputata))
		)
		{
			responsum.sendStatus(401);
		} else
		{
			responsum.sendStatus(200)
			console.log(`Events on ${Date()}:`)
			let eventusID = []
			for (const eventus of petitum.body.events)
			{
				eventusID.push(eventus["resource"]["gid"])
			}
			//asanaElaboratio.iterUpdate(eventusID);
		}
	}
	 else
	{
		console.error("Aliquid non fungitur");
	}

};
