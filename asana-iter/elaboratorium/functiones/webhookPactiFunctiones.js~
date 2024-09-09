const crypto = require('crypto')
const VERVM = true;
const FALSVM = false;

//TEMPORALIA: Melius salvare tessera_x_hook in repositorio datorum
let tessera_x_hook;


exports.accipereWebhook = (petitum, responsum) =>
{
//Condere emissionem ab elaboratorio Asanae
	if (petitum.headers["x-hook-secret"])
	{
		console.log("Nova emissio elaboratorii Asana")
		tessera_x_hook = petitum.headers["x-hook-secret"]
		responsum.setHeader("X-Hook-Secret", tessera_x_hook)
		responsum.status(200).send('OK');
		//Accipere emissionem ab elaboratorio Asanae
	} else if (petitum.headers["x-hook-signature"])
	{
		const tesseraComputata = crypto
			.createHmac("SHA256", tessera_x_hook)
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
			iterUpdate(eventusID);
		}
	}
	 else
	{
		console.error("Aliquid non fungitur");
	}

};


