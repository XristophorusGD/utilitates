/* Architectus adnotationes
**immutabiles instrumenta ====================================================================================
*      _    _____ ____      _    _____   ___ __  __ __  ____     _______  _    ____ ___ _     _____ ____
*     / \  | ____|  _ \    / \  | ____| |_ _|  \/  |  \/  \ \   / /_   _|/ \  | __ )_ _| |   | ____/ ___|
*    / _ \ |  _| | |_) |  / _ \ |  _|    | || |\/| | |\/| |\ \ / /  | | / _ \ |  _ \| || |   |  _| \___ \
*   / ___ \| |___|  _ <  / ___ \| |___   | || |  | | |  | | \ V /   | |/ ___ \| |_) | || |___| |___ ___) |
*  /_/   \_\_____|_| \_\/_/   \_\_____| |___|_|  |_|_|  |_|  \_/    |_/_/   \_\____/___|_____|_____|____/
*/

const {BrowserWindow} = require('electron');
const Asana = require('asana');
const path = require('path');
const axios = require('axios');
const repositorium = require('../repositorium_datorum/repositorium');

/*
 *
 *  _______  _______ __  __ ____  _        _    ____  
 * | ____\ \/ / ____|  \/  |  _ \| |      / \  |  _ \ 
 * |  _|  \  /|  _| | |\/| | |_) | |     / _ \ | |_) |
 * | |___ /  \| |___| |  | |  __/| |___ / ___ \|  _ < 
 * |_____/_/\_\_____|_|  |_|_|   |_____/_/   \_\_| \_\
 *                                                         
 * exemplar*************************************
 * Title: fenestellaPQSME
 * Descriptio: Constituit novam fenestellam quâ probâtur ûsuârius quem significet sê esse
 * Intus:  nullus
 * Exitus: nullus
 */

class fenestellaPQSME
{
	static #simulacrum;
	static #fenestella;
	static #seConstituit = false;
	static #pagina = path.join(__dirname, "..","/html/index.html");
	static #mensurae = [800,600]

	constructor()
	{
		if (!fenestellaPQSME.#seConstituit)
		{
			throw new TypeError("functione new simulacrum non creatur")
		}
		else
		{
			console.log("Fenestella PQSME creatum")
		}
	}
	static #estneFenestella()
	{
		return this.#fenestella !== undefined;
	}


	async #initialize()
	{
		try
		{
			console.log("Nova fenestella aperitur")
			console.log(__dirname)
			fenestellaPQSME.#fenestella = new BrowserWindow(
				{
			                width:  fenestellaPQSME.#mensurae[0],
			                height: fenestellaPQSME.#mensurae[1],
			                webPreferences:
					{
						nodeIntegration: false,
						contextIsolation: true,
						enableRemoteModule:false,
						sandbox: true,
						preload: path.join(__dirname, ".." ,"preload.js")
					}
			        })

	        	fenestellaPQSME.#fenestella.loadFile(fenestellaPQSME.#pagina)
		}
		catch(error)
		{
			console.log(error)
		}
	}

	static utiFenestella()
	{
		console.log("PQSME Nunc")
		return new Promise(async (solutum, falsum) =>
		{
			if(!fenestellaPQSME.#estneFenestella())
			{
				fenestellaPQSME.#seConstituit = true;
				fenestellaPQSME.#simulacrum = new fenestellaPQSME();
				await fenestellaPQSME.#simulacrum.#initialize()
			}
			solutum(fenestellaPQSME.#fenestella)
		})
	}

	static relinquereFenestellam()
	{
		fenestellaPQSME.#fenestella.close;
		fenestellaPQSME.#simulacrum = undefined;
	}
}


/*
 *
 *  _______  _______ __  __ ____  _        _    ____  
 * | ____\ \/ / ____|  \/  |  _ \| |      / \  |  _ \ 
 * |  _|  \  /|  _| | |\/| | |_) | |     / _ \ | |_) |
 * | |___ /  \| |___| |  | |  __/| |___ / ___ \|  _ < 
 * |_____/_/\_\_____|_|  |_|_|   |_____/_/   \_\_| \_\
 *                                                         
 * exemplar*************************************
 * Title: fenestellaDescriberePensum
 * Descriptio: Constituit novam fenestellam quâ probâtur ûsuârius quem significet sê esse
 * Intus:  nullus
 * Exitus: nullus
 */

class fenestellaDescriberePensum
{
	static #simulacrum;
	static #fenestella;
	static #seConstituit = false;
	static #pagina = path.join(__dirname, "..","/html/adderePensumAsana.html");
	static #mensurae = [800,700]

	constructor()
	{
		if (!fenestellaDescriberePensum.#seConstituit)
		{
			throw new TypeError("functione new simulacrum non creatur")
		}
		else
		{
			console.log("Fenestella PQSME creatum")
		}
	}
	static #estneFenestella()
	{
		return this.#fenestella !== undefined;
	}


	async #initialize(eCongeries)
	{
		console.log("RIGIDUS THALARUS V")
		try
		{
			fenestellaDescriberePensum.#fenestella = new BrowserWindow(
				{
			                width:  fenestellaPQSME.#mensurae[0],
			                height: fenestellaPQSME.#mensurae[1],
			                webPreferences:
					{
						nodeIntegration: false,
						contextIsolation: true,
						enableRemoteModule:false,
						sandbox: true,
						preload: path.join(__dirname, "..","preload.js")
					}
			        })

				fenestellaDescriberePensum.#fenestella.loadFile(fenestellaPQSME.#pagina)
				fenestellaDescriberePensum.#fenestella.webContents.send("creatum-pensum", eCongeries)
		}
		catch(error)
		{
			console.log(error)
		}
	}

	static utiFenestella(eCongeries)
	{
		console.log("ECCCEE")
		return new Promise(async (solutum, falsum) =>
		{
			if(!fenestellaDescriberePensum.#estneFenestella())
			{
				fenestellaDescriberePensum.#seConstituit = true;
				fenestellaDescriberePensum.#simulacrum = new fenestellaDescriberePensum();
				await fenestellaDescriberePensum.#simulacrum.#initialize(eCongeries)
			}
			solutum(fenestellaDescriberePensum.#fenestella)
		})
	}

	static relinquereFenestellam()
	{
		fenestellaDescriberePensum.#fenestella.close;
		fenestellaDescriberePensum.#simulacrum = undefined;
	}
}

module.exports =
{
	fenestellaPQSME: fenestellaPQSME,
	fenestellaDescriberePensum: fenestellaDescriberePensum
}
