let radioGlobuli = document.querySelectorAll("input[name=genusExpressionis]")
radioGlobuli.forEach((globulus) =>
{
	document.querySelector("#"+globulus.id).addEventListener("change", 
		function(e)
		{

			let radioGlobuli = document.querySelectorAll("input[name=genusExpressionis]")

			radioGlobuli.forEach((intus) =>
			{
				console.log(intus.value)
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
	window.Asana.ad("indicem-creare")
})
