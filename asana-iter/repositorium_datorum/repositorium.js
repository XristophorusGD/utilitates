const mongoose = require('mongoose');
const fs = require('fs');
const {MongoClient, OIDCCallbackParams, OIDCResponse} = require('mongodb');
//import type {OIDCCallbackParams} from 'mongodb'
//import type {OIDCCallbackParams} from 'mongodb'

/*const consequiAuctoritates = (params: OIDCCallbackParams): Promise<OIDCResponse> =>
{
	const signumOIDC = fs.readFileSync("oidc.dat", "utf8")
	return 
	{
		accessToken:      signumOIDC,
		expiresInSeconds: 300,
		refreshToken:     signumOIDC
	};
}*/

async function consequiAuctoritates(timeoutContext, versio, idpInfo, usuarius, refreshToken)
{
	console.log("OIDC-Auth")
	const signumOIDC = fs.readFileSync("oidc.dat", "utf8")
	return {
		accessToken:      signumOIDC,
		expiresInSeconds: 300,
		refreshToken:     signumOIDC
	};
}

/*
const consequiAuctoritates = new Promise((resolve, reject) =>
{
	console.log("OIDC-Auth")
	const signumOIDC = fs.readFileSync("oidc.dat", "utf8")
	
	resolve({
		accessToken:      signumOIDC,
		expiresInSeconds: 300,
		refreshToken:     signumOIDC
	});
})
*/
class ususRepositorii
{
	static #simulacrum;
	static #usuariumMongo;
	static #repositorium;
	static #seConstituit = false;

	constructor()
	{
		if (!ususRepositorii.#seConstituit)
		{
			throw new TypeError("functione new simulacrum non creatur")
		}
		else
		{
			console.log("Novum usuarium Mongo DB creatum")
		}

		ususRepositorii.#seConstituit = false;
	}
	
	static #estneUsus()
	{
		return this.#usuariumMongo !== undefined
	}

	async #initialize(auctoritasMongo)
	{
		try
		{
			//const REPOSITORIVM_DATORVM = `mongodb://${auctoritasMongo['usuarium']}:${auctoritasMongo['tesseraMongoDB']}@0.0.0.0:27017`
			const REPOSITORIVM_DATORVM = `mongodb+srv://${auctoritasMongo['usuarium']}:${auctoritasMongo['tesseraMongoDB']}@trio-forecaster-test.jb40h.mongodb.net/`
			//const REPOSITORIVM_DATORVM = `mongodb+srv://CivisPrimus@trio-forecaster-test.jb40h.mongodb.net/?authMechanism=MONGODB-OIDC`
			//const REPOSITORIVM_DATORVM = `mongodb+srv://trio-forecaster-test.jb40h.mongodb.net/?authSource=%24external&authMechanism=MONGODB-OIDC`
			ususRepositorii.#usuariumMongo = new MongoClient(REPOSITORIVM_DATORVM)
				/*{
					authMechanismProperties:
					{
						OIDC_CALLBACK: consequiAuctoritates
					}
				}
			)*/
			ususRepositorii.#repositorium = ususRepositorii.#usuariumMongo.db("trio-higher-edu");
			console.log("Uteris Repositorio Probationis")
		}
		catch(error)
		{
			console.log(error)
			console.log("Non potes connectare cum Mongo")
		}
	}

	static utiRepositorio(auctoritates="")
	{
		return new Promise(async (solutum, falsum) =>
		{
			if(!ususRepositorii.#estneUsus())
			{
				ususRepositorii.#seConstituit = true;
				ususRepositorii.#simulacrum = new ususRepositorii();
				await ususRepositorii.#simulacrum.#initialize(auctoritates);
			}
			solutum(ususRepositorii.#simulacrum)
		});
	}

	static relinquere()
	{
		if (ususRepositorii.#simulacrum !== undefined)
		{
			ususRepositorii.#usuariumMongo.close();
		}
		else
		{
			console.log("Abest DB conexus")
			return;
		}
	}
	
	consequiCongeriem(congeries)
	{
		return new Promise(async (solutum, falsum) =>
		{
			solutum(ususRepositorii.#repositorium.collection(congeries))
		});
	}
}

module.exports = ususRepositorii
