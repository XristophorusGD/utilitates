
/*const nodemon = require('nodemon')

let locusret = null

nodemon.on('start', async () => {
	if (!locusret)
	{
		locusret = await ngrok.forward(
			{
				addr: ostiolum,
				authtoken_from_env: true,
				oauth_provider: "google",
				oauth_allow_domains: "ualr.edu"
		})

		//locusret = await ngrok.connect({ portus: ostiolum})
		console.log(`Elaboratorium libens loco ${locusret} et nunc immittit data`)
	}
}).on('quit', async() => {
	console.log("circumscribitur TRIO Forecaster")
	await ngrok.kill()
})
*/

//Temporale: tessera per oauth 

const MONGO_TESSERA_DECOCTA="f8ffbd4b02bb04d107869211a36c342a24a71404856fb6f020484dcf4069b028"

document.querySelector('form').addEventListener('submit', (e) =>
{
	        e.preventDefault();
	        let data = Object.fromEntries(
		                new FormData(e.target)
			        )
		data['usuarium'] = "trioCivisI"
		window.Asana.ad("PQSME", data)
})
window.Asana.ab("mongodb-ignotum", ()=>
{
	console.log("Tessera non est")

})

window.Asana.ab("mongodb-notum", ()=>
{
	console.log ("PQSTE per Asanam")
	document.location.href="http://localhost:3000/oauth/agnoscere"
})
const mittere = ()=>
{
	        //consequre data formulae
	//        //window.Asana.ad("describe-pensum", (novumPensumID, dataFormulae))
	//        
}
