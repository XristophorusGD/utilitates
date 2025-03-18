let radioGlobuli = document.querySelectorAll("input[name=genusExpressionis]")

document.querySelector("#diesPrimusExpressionis").value = "2024-09-01"
let hodie = new Date();
document.querySelector("#diesUltimusExpressionis").value = (new Date(
	hodie.getTime()-((hodie.getTimezoneOffset())*60*1000))).toISOString().
	split("T")[0]




radioGlobuli.forEach((globulus) =>
{
	document.querySelector("#"+globulus.id).addEventListener("change", 
		function(e)
		{

			let radioGlobuli = document.querySelectorAll("input[name=genusExpressionis]")

			radioGlobuli.forEach((intus) =>
			{
				let formulaeIntus = document.querySelector("#"+intus.id)
				let formulae = formulaeIntus.
					parentElement.querySelector("div[name=formula-typis-exprimendi]")
				let intusTypisExprimendi = formulae.querySelectorAll("input")
				intusTypisExprimendi.forEach((formulaDierum) =>
					{
						document.querySelector("#"+formulaDierum.id).disabled = !(intus.checked);
					}
				);
			});
		
		});
});

let noliIndicemCreare = document.querySelector("#noliIndicemCreare");
noliIndicemCreare.addEventListener("click", (e) => 
{
	window.Asana.ad("noli-indicem-creare");
})

let indicemCreare = document.querySelector("form");

indicemCreare.addEventListener("submit", (e) =>
{
	//eligere
	e.preventDefault();

	let data = Object.fromEntries(
		new FormData(e.target)
	)
	if(data["genusExpressionis"] == "intervalla-typis-exprimere")
	{
		let diesPrimus  = new Date(data["diesPrimusExpressionis"])
		let diesUltimus = new Date(data["diesUltimusExpressionis"])
		window.Asana.ad(data["genusExpressionis"], {"diesPrimus": diesPrimus, "diesUltimus": diesUltimus});
	}
	else
	{
		window.Asana.ad(data["genusExpressionis"], data["expressionisFormula"]);
	}

})
