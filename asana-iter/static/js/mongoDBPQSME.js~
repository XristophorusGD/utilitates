MONGO_TESSERA_DECOCTA="f8ffbd4b02bb04d107869211a36c342a24a71404856fb6f020484dcf4069b028"

document.querySelector('form').addEventListener('submit', (e) =>
{
	e.preventDefault();
	let data = Object.fromEntries(
		new FormData(e.target)
	)
	data['usuarium'] = "trioCivisI"
	const urlParams = new URLSearchParams(window.location.search)

	data['tesseraPetitionis'] = urlParams.get('code')
	window.Asana.ad("pqsme-mongo-oauth", data)
	})

window.Asana.ab("mongodb-ignotum", ()=>
	{
		        console.log("Tessera non est")

	})
window.Asana.ab("mongodb-notum", ()=>
	{
		const urlParams = new URLSearchParams(window.location.search)
		console.log ("PQSME ad Mongo")
		let tessera = urlParams.get('code');
		document.location.href=`http://localhost:3000/oauth/rectum-pqsme/?code=${tessera}`
	})
/*window.Asana.ab("oauth-aditus-asanae", (tesseraAditus)=>
{
	document.location.href="/receiveWebhook"
	document.location.href=`/?access_token=${tesseraAditus}`
})*/
