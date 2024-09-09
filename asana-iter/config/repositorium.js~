const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');

exports.excitare = async (auctoritasMongo) =>
{
/*		mongoose.connect(
			REPOSITORIVM_DATORVM,
			{
				keepAlive: VERVM,
				useNewUrlparser: VERVM,
				useUnifiedTopology: VERVM
			},
			(error) =>
			{
				if(error)
				{
					console.log(error)
				}
				else
				{
					console.log("connexus")
				}
			}
*/
		const REPOSITORIVM_DATORVM = `mongodb://${auctoritasMongo['usuarium']}:${auctoritasMongo['tesseraMongoDB']}@localhost:27017/test`
		const usuariumMongo = new MongoClient(REPOSITORIVM_DATORVM)
		return usuariumMongo
}

