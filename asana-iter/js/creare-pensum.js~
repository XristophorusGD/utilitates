let novumPensumID;

console.log("EXSPECTANS");
window.Asana.ab("creatum-pensum", (pensiSignum)=>
{
	let seriesNovorumPensorum = []
	for (const x of pensiSignum)
	{
		seriesNovorumPensorum.push(x);
	}
	novumPensumID = seriesNovorumPensorum[0]
	console.log(novumPensumID)
})

document.querySelector('form').addEventListener('submit', (e) =>
{
	e.preventDefault();
	let data = Object.fromEntries
	(
		new FormData(e.target)
	)
	data['GID'] = novumPensumID
	window.Asana.ad("describe-pensum", (data))

})

