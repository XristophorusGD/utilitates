const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');


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
			const REPOSITORIVM_DATORVM = `mongodb://${auctoritasMongo['usuarium']}:${auctoritasMongo['tesseraMongoDB']}@0.0.0.0:27017`
			ususRepositorii.#usuariumMongo = new MongoClient(REPOSITORIVM_DATORVM)
			ususRepositorii.#repositorium = ususRepositorii.#usuariumMongo.db("test");
			console.log(" Uteris Repositorio Probationis")
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
				if(auctoritates != "")
				{
					ususRepositorii.#seConstituit = true;
					ususRepositorii.#simulacrum = new ususRepositorii();
					await ususRepositorii.#simulacrum.#initialize(auctoritates);
				}
				else
				{
					console.log("Mongo DB non uteris")
				}
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
