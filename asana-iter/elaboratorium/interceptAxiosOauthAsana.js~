/* Architectus adnotationes
**immutabiles instrumenta ====================================================================================
*      _    _____ ____      _    _____   ___ __  __ __  ____     _______  _    ____ ___ _     _____ ____
*     / \  | ____|  _ \    / \  | ____| |_ _|  \/  |  \/  \ \   / /_   _|/ \  | __ )_ _| |   | ____/ ___|
*    / _ \ |  _| | |_) |  / _ \ |  _|    | || |\/| | |\/| |\ \ / /  | | / _ \ |  _ \| || |   |  _| \___ \
*   / ___ \| |___|  _ <  / ___ \| |___   | || |  | | |  | | \ V /   | |/ ___ \| |_) | || |___| |___ ___) |
*  /_/   \_\_____|_| \_\/_/   \_\_____| |___|_|  |_|_|  |_|  \_/    |_/_/   \_\____/___|_____|_____|____/
*
*/

// Instrumentorum indices

const axios = require("axios");



/*
 *  ____ __ __ __  __   ___ ______ __   ___
 * ||    || || ||\ ||  //   | || | ||  // \\
 * ||==  || || ||\\|| ((      ||   || ((   ))
 * ||    \\_// || \||  \\__   ||   ||  \\_//
 *
 * functio************************************
 * Title: oauthInterceptorError
 * Descriptio:  respondet errôribus quî emergunt ûsuâriîs oauth-asana
 * Intus: descrîptiô pensî (exitus formulariae)
 * Exitus: nil
 */


exports.oauthInterceptorError = async (error) =>
{
	const genuserroris = error.response ? error.response.status : null;
	switch (genuserroris)
	{
		case 401:
			const repoDatorum = await repositorium.utiRepositorio()
			const arces = await repoDatorum.consequiCongeriem('arx')
			const usuariusMongo = await arces.findOne({signum_usuarii:"trioCivisII"});
			const materia =
			{
				grant_type: "refresh_toekn",
				client_id: process.env.CLIENT_ID,
				client_secret: usuariusMongo.tacendum_usuarii,
				redirect_uri: process.env.REDIRECT_URI,
				code: usuariusMongo.tessera_petitionis,
				refresh_token: usuariusMongo.novus_aditus_oauth
			}
			const constitutio =
			{
				headers:
				{
					"content-type": "application/x-www-form-urlencoded"
				}
			};
			await axios.post("https://app.asana.com/-/oauth_token", materia, constitutio)
				.then((responsum) =>
				{
					console.log("Responsum con\u1010tui permutandî signa\n")
					console.log(responsum.data);
					return responsum.data;
				})
				.then((data) =>
				{
					arces.updateOne({signum_usuarii:"trioCivisII"}, {$set: {aditus_oauth: data.access_token}})
					arces.updateOne({signum_usuarii:"trioCivisII"}, {$set: {novus_aditus_oauth: data.refresh_token}})
					return data.access_token;
				})
			break;
	}
	return Promise.reject(error);
}
