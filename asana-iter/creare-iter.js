const hodie = new Date();
const currMonday = updateWeek(hodie, 0);

window.Asana.ad("da-pensum")
//window.Asana.ad("da-asanae-sectiones");
console.log("da me!");
const dieiIndex = 
{
	"Lunes": 1,
	"Martes": 2,
	"Miercoles": 3,
	"Jueves": 4,
	"Viernes": 5,
	"Monday": 1,
	"Tuesday": 2,
	"Wednesday": 3,
	"Thursday": 4,
	"Friday": 5
}

let iterGenPIndx = [{},{},{},{},{},{},{}]

let count = 0;



window.Asana.ab("datae-asanae-sectiones", (dieiSept) =>
{
	dieiSept.forEach((dies) =>
	{
		window.Asana.ad("da-asanae-diem", (dies.name, dies.gid));

	});
});


window.Asana.ab("datus-asanae-dies", async (dieiPensa) =>
{
	count++
	dieiPensa.forEach((pensum) =>
	{
		//hac in parte inscribitur in indice
		iterGenPIndx[dieiIndex[pensum.memberships[0].section.name]][pensum.gid]={};
	});
	if(count > 4)
	{
		for (dies of iterGenPIndx)
		{
		
			if (vacuane(dies))
			{
				continue;
			}
			else
			{
				for  await (const dieiPensiGID of Object.keys(dies))
				{

					window.Asana.ad("da-asanae-pensum", (dieiPensiGID))
				}
			}
		}
		window.Asana.ad("json-constituere", (currMonday, iterGenPIndx))
	}
});

window.Asana.ab("datum-asanae-pensum", (dieiPensiSingula) =>
{
	let pensumObj = 
	{
		"title": dieiPensiSingula.name,
		"description": dieiPensiSingula.notes,
		"subtasks":{},
	}

	if(dieiPensiSingula["parent"] != null)
	{
		let pensuliLocus =  investigarePenPar(dieiPensiSingula.parent.gid)
		iterGenPIndx[pensuliLocus[0]][dieiPensiSingula.parent.gid]["subtasks"][dieiPensiSingula.gid] = pensumObj;
	}
	else
	{
		iterGenPIndx[dieiIndex[dieiPensiSingula.memberships[0].section.name]][dieiPensiSingula.gid] = pensumObj
	}

	window.Asana.ad("da-asanae-pensula", dieiPensiSingula.gid)
});


window.Asana.ab("data-asanae-pensula", (dataPensula) =>
{
	if (dataPensula.length == 0)
	{
		return;
	}
	else
	{
		for (pensulum of dataPensula)
		{
			window.Asana.ad("da-asanae-pensum", pensulum.gid)
		}
	}
});


window.Asana.ab("itinerarium_promptum", () =>
{
	console.log("itinerary_paratum");

});

function investigarePenPar(pensiParens)
{	
	let pensiLocus = [""];
	for (dieiSept in Object.keys(iterGenPIndx))
	{
		pensiLocus[0] = parseInt(dieiSept,10)

		//Estne parens hac in indice
		let pensorumIndex = Object.keys(iterGenPIndx[dieiSept])
		if (pensorumIndex.includes(pensiParens))
		{
			pensiLocus.push(pensiParens);
			return pensiLocus;
		}
	}	
}

function updateWeek(refDay, weekInterval)
{
	    
	let annus      = refDay.getFullYear();
	let monthNum   = refDay.getMonth();
	let mondayDist = refDay.getDay()-1;
	let mondayDate = refDay.getDate() - mondayDist;
	   

	//PARS I: computa diem itinerarii

	mondayDate += weekInterval*7;

	////PI.A si diei num excedat max. diem aut succedit min. die
	let currMonthMax = new Date(annus, monthNum+1, 0).getDate();
	let prevMonthMax = new Date(annus, monthNum, 0).getDate();
	if (mondayDate < 1)
	{
		monthNum -= 1;
		mondayDate += prevMonthMax;
		currMonthMax = prevMonthMax;
		prevMonthMax = new Date(annus, monthNum - 1, 0).getDate();
	}
	if (mondayDate > currMonthMax)
	{
		monthNum += 1;
		mondayDate -= currMonthMax;
		prevMonthMax = currMonthMax;
		currMonthMax = new Date(annus, monthNum, 0).getDate();
	}

	////PI.B corrige numerum mensis et anni si transit per annos
		if (monthNum < 0)
	{
		annus -= 1;
		monthNum = 11;
	}
	if (monthNum > 11)
	{
		annus += 1;
		monthNum = 0;
	}

	return new Date(annus, monthNum, mondayDate);
}

const vacuane = (res)=>
{
	return (res && Object.keys(res).length === 0 && res.constructor === Object);
}



