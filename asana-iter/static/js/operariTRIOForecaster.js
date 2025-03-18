window.Asana.ad("aditum-ad-asanam")
document.querySelector('#itinerariaTypisExprimere').addEventListener('click', (e) =>
{
	window.Asana.ad("itineraria-typis-exprimere")
}
)
document.querySelector('#itinerariumDepromere').addEventListener('click', (e) =>
{
	let dies = new Date()
	window.Asana.ad("word-constituere", dies)
});

window.Asana.ab("seratibitinera", (responsum) =>
{
        alert("Itineraria sera haec sunt:\n\n" + responsum.monitio)
	console.log(responsum.itinerariiStatus)
	statusPicturae(responsum.itinerariiStatus)
}
)

window.Asana.ab("tibiternondum", (statusTabularum)=>
{
	console.log("Non tibi est iter, crea!")
	statusPicturae(statusTabularum)
}
)

window.Asana.ab("tibistnunciter", (statusTabularum)=>
{
	console.log("Bene tibi est iter!")
	statusPicturae(statusTabularum)
}
)
window.Asana.ab("expectaturiter", (statusTabularum)=>
{
	console.log("Dies Lunae!")	
	statusPicturae(statusTabularum)
}
)
window.Asana.ad("itinerarium-restituere")

function statusPicturae(statusTabularum)
{
	const materia = document.querySelector("body")
	const globuli = document.querySelectorAll("button")

	console(statusTabularum.praesensAbest)

	if(statusTabularum.diesLunae)
	{
		console.log("Species Diei Lunae")
		materia.className = "expectaturiter"
			//diei Lunae species
	}
	else if(statusTabularum.praesensAbest)
	{
		console.log("Species De Praesentis Septimanae Itinerarii Absentia")
		materia.className = "tibiternondum"
		//diei Lunae species - itinerarium praesens tradendum
	}
	else if(statusTabularum.backlog)
	{
		console.log("Species Backlog")
		materia.className = "seratibitinera"
		//Itinerario praesente traditô, alia sêra itineraia tradenda
	}
	else
	{
		console.log("Omnia Bene Valent")
		materia.className = ""
		//Omnia bene
	}
}
