let novumPensumID;

console.log("EXSPECTANS");
window.Asana.ab("creatum-pensum", (pensiSignum)=>
{
	console.log("NAEE");
	let seriesNovorumPensorum = []
	for (const x of pensiSignum)
	{
		seriesNovorumPensorum.push(x);
	}
	novumPensumID = seriesNovorumPensorum[0]
})

document.querySelector('form').addEventListener('submit', (e) =>
{
	e.preventDefault();
	let data = Object.fromEntries(
		new FormData(e.target)
	)
	console.log(data)
	document.location.href="oauth/agnoscere"
})

const mittere = ()=>
{
	//consequre data formulae
	//window.Asana.ad("describe-pensum", (novumPensumID, dataFormulae))
}
