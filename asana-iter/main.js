/* Architectus adnotationes
 *
 * Necessse est mihi constituere MangoDB repositôrium ut servem data utenda oauth asana
 * Nunc necesse est mihi probâre initium permutatiônem signôrum quâ aditus Oauth constituâtur 
 * -- forte path nôn fungitur
 * -- index.html mutanda ut per globolum adeat ad /authorization
 * -- nesciô an adhuc elaborâtrum rêtiâle fungâtur per electron
 * -- Volô inicere client secret moderâmine et nôn aerâ servâtâ in computâtôriô
 



 **immutabiles instrumenta ====================================================================================
 *      _    _____ ____      _    _____   ___ __  __ __  ____     _______  _    ____ ___ _     _____ ____  
 *     / \  | ____|  _ \    / \  | ____| |_ _|  \/  |  \/  \ \   / /_   _|/ \  | __ )_ _| |   | ____/ ___| 
 *    / _ \ |  _| | |_) |  / _ \ |  _|    | || |\/| | |\/| |\ \ / /  | | / _ \ |  _ \| || |   |  _| \___ \ 
 *   / ___ \| |___|  _ <  / ___ \| |___   | || |  | | |  | | \ V /   | |/ ___ \| |_) | || |___| |___ ___) |
 *  /_/   \_\_____|_| \_\/_/   \_\_____| |___|_|  |_|_|  |_|  \_/    |_/_/   \_\____/___|_____|_____|____/ 
 *                                                         
 */

// Instrumentorum indices
const { app, BrowserWindow,ipcMain } = require('electron');
const ngrok = require("@ngrok/ngrok");
const path = require('node:path');
const fs = require('fs');
const docx = require('docx');
const Asana = require('asana');
const express = require('express');
const elaboratorium = express();
const dirWebhook = require('./elaboratorium/directoria/webhookDirectorium');
const dirOauth = require('./elaboratorium/directoria/oauthDirectorium');
const repositorium = require('./config/repositorium');
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");

elaboratorium.use(dirWebhook);
elaboratorium.use(dirOauth);

// Data
const VERVM = true;
const FALVSM = false;
const ostiolum = 3000;
const patNum = "2/1207977442189503/1207982609875812:a3fb856c4bea652fb55b75f2483ba006";
const client = Asana.ApiClient.instance;
const token = client.authentications['token'];
token.accessToken = patNum;
/**incertae =============================================================================================           
 *      _    _____ ____      _    _____   ___ _   _  ____ _____ ____ _____  _    _____ 
 *     / \  | ____|  _ \    / \  | ____| |_ _| \ | |/ ___| ____|  _ \_   _|/ \  | ____|
 *    / _ \ |  _| | |_) |  / _ \ |  _|    | ||  \| | |   |  _| | |_) || | / _ \ |  _|  
 *   / ___ \| |___|  _ <  / ___ \| |___   | || |\  | |___| |___|  _ < | |/ ___ \| |___ 
 *  /_/   \_\_____|_| \_\/_/   \_\_____| |___|_| \_|\____|_____|_| \_\|_/_/   \_\_____|
 *                                                                                                                
 */

let fenPrima;
let fenPenNov;
let webhookID = "";


/*
 *  ____ __ __ __  __   ___ ______ __   ___  
 * ||    || || ||\ ||  //   | || | ||  // \\ 
 * ||==  || || ||\\|| ((      ||   || ((   ))
 * ||    \\_// || \||  \\__   ||   ||  \\_// 
 *                                          
 * *******************************************
 * Title: iterUpdate
 * Descriptio: creâtiônem côgit fenestellae quâ novum pensum descrîbitur cum pensum addâtur
 * Intus: webhook eventus index
 * Exitus: nil
 */

function iterUpdate(eventuumSeries)
{
	const eventuumCongeries = new Set(eventuumSeries)
	console.log(eventuumCongeries.size)
	if (eventuumCongeries.size)
	{
		describerePensumNovum(eventuumCongeries)
		console.log("MITTE")
	}
}


/*
 *  ____ __ __ __  __   ___ ______ __   ___  
 * ||    || || ||\ ||  //   | || | ||  // \\ 
 * ||==  || || ||\\|| ((      ||   || ((   ))
 * ||    \\_// || \||  \\__   ||   ||  \\_// 
 *                                          
 * *******************************************
 * Title: describerePensumNovum
 * Descriptio: Constituit novam fenestellam describendî pensum novum
 * Intus: lunae dies huius septimanae
 * Exitus: nil
 */

const describerePensumNovum = async (eCongeries) => {
	fenPenNov = new BrowserWindow({
		alwaysOnTop: true,
		frame: false,
		resizable: false,
		width: 800,
		height: 300,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			sandbox: true,
			preload: 'F:/_it_opes/repo/asana-iter/preload.js'
		}
	})
	await fenPenNov.loadFile('adderePensumAsana.html')

	fenPenNov.webContents.send("creatum-pensum", eCongeries)
	
}



/*
 *  ____ __ __ __  __   ___ ______ __   ___  
 * ||    || || ||\ ||  //   | || | ||  // \\ 
 * ||==  || || ||\\|| ((      ||   || ((   ))
 * ||    \\_// || \||  \\__   ||   ||  \\_// 
 *                                          
 * *******************************************
 * Title: fenestellamCreare
 * Descriptio: principem fenestellam creâre
 * Intus: nîl
 * Exitus: nîl
 */

const fenestellamCreare = () => {
	fenPrima = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			enableRemoteModule:false,
			sandbox: true,
			preload: 'F:/_it_opes/repo/asana-iter/preload.js'
		}
	})
	fenPrima.loadFile('index.html')
}


app.whenReady().then(async () =>
{
		elaboratorium.listen(ostiolum, () => {
			console.log (`elaboratorium exspectat ostiolo http://localhost:${ostiolum}`)
		})

		elaboratorium.use(express.json());

		const aditusadrete = await ngrok.forward(
			{
				addr: ostiolum,
				authtoken: "2kOMN9Rlf4ak6eO4phexfkLykTs_832Tme7AGJ6WcPJAAwi2S",
				//oauth_provider: "google",
				//oauth_allow_emails: "chdavis1@ualr.edu",
				//oauth_allow_domains: "ualr.edu"
			});
		console.log (`elaboratorium exspectat loco:${aditusadrete.url()}`)
		console.log("Emissio ab elaboratorio Asanae constituitur")

		//TEMPORALIA: melius habêre locum rêtiâlem constantem ut aliî ûsuâriî aditum habeant ad
		//Oauth Asanae
		//process.env.REDIRECT_URI = `adistusadrete.url()/oauth-callback`;

		fenestellamCreare()
		app.on('activate', () =>
		{
			if (BrowswerWindow.getAllWindows().length === 0)
			{
				fenestellamCreare()
			}
		})

	})

	app.on('window-all-closed', async (e)=>
	{
		e.preventDefault();
		let webhooksApiInstance = new Asana.WebhooksApi();
		let webhookDel = webhooksApiInstance.deleteWebhook(webhookID).then((exitus) => {
			console.log("API vocatur, reddit: " + JSON.stringify(exitus.data, null, 2));

				if (process.platform !== 'darwin')
				{
					app.quit()
				}
			}	, (error) => {
				console.error(error.response.body)
			});

	})
/*
 *  ____ __ __ __  __   ___ ______ __   ___  
 * ||    || || ||\ ||  //   | || | ||  // \\ 
 * ||==  || || ||\\|| ((      ||   || ((   ))
 * ||    \\_// || \||  \\__   ||   ||  \\_// 
 *                                          
 * *******************************************
 * Title: PQSME
 * Descriptio: Proba an datum ûsuâriî nômen et tesseram pertineant ad ûsuârium repositôriî Mongo
 * Intus: tesseraMongo
 * Exitus: nil
 */


ipcMain.on("PQSME", async (e, auctoritasMongo) =>
{
	const TESSERA_MONGO_DECOCTA = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"

	if (crypto.timingSafeEqual(
		Buffer.from(TESSERA_MONGO_DECOCTA),
		Buffer.from(crypto.createHash("sha256", auctoritasMongo.tesseraMongoDB).digest('hex')
	)))
	{
		let usuariumMongo = await repositorium.excitare(auctoritasMongo)
		console.log(usuariumMongo.db('test').collection('arx').find());
		usuariumMongo.close()
		fenPrima.webContents.send("mongodb-notum", )
	}
	else
	{
		fenPrima.webContents.send("mongodb-ignotum")
	}
})


/*
 *  ____ __ __ __  __   ___ ______ __   ___  
 * ||    || || ||\ ||  //   | || | ||  // \\ 
 * ||==  || || ||\\|| ((      ||   || ((   ))
 * ||    \\_// || \||  \\__   ||   ||  \\_// 
 *                                          
 * *******************************************
 * Title: word-constituere
 * Descriptio: Constituit scapum .docx in quo inscribuntur pensa asanae
 * Intus: lunae dies huius septimanae
 * Exitus: nil
 */


ipcMain.on("connecta-teleopsem-ad-asanam", async (e, pensiDescriptio) =>
{

		let webhooksApiInstance = new Asana.WebhooksApi();


		let materia = 
			{
				"data":
				{
					"filters": 
					[
						{
								"action": "added",
							"resource_type": "task",
						}
					],
					//"resource": "1207982562429475",
					"resource": "1207982562429472",
					"target": aditusadrete.url()+"\/receiveWebhook"
				}
			}
		let conditiones = 
			{
				"opt_fields": `active,created_at,filters,filters.action,
				filters.fields,filters.resource_subtype,last_failure_at,
				last_failure_content,last_success_at,resource,
				resource.name,target`
			}

		let mora = 1000

		while(!utentiaSuscepta)
		{
			webhooksApiInstance.createWebhook(res, conditiones).then((exitus) => {
				webhookID = exitus.data.gid
				console.log("iniectio prima");
				console.log(webhookID)
				console.log("API vocatur, reddit: " + JSON.stringify(exitus.data, null, 2));
				utentiaSuscepta = true;
			}, (error) => {
				console.error(error.response.body)
			});
			await new Promise(resolve => setTimeout(resolve, mora));
			console.log("RURSUM")
			mora *= 1.1
		}
});


/*
 *  ____ __ __ __  __   ___ ______ __   ___  
 * ||    || || ||\ ||  //   | || | ||  // \\ 
 * ||==  || || ||\\|| ((      ||   || ((   ))
 * ||    \\_// || \||  \\__   ||   ||  \\_// 
 *                                          
 * *******************************************
 * Title: word-constituere
 * Descriptio: Constituit scapum .docx in quo inscribuntur pensa asanae
 * Intus: lunae dies huius septimanae
 * Exitus: nil
 */


ipcMain.on("describe-pensum", (e, pensiDescriptio) =>
{
	token.accessToken = PAT_NVM

	let tasksApiInstance = new Asana.TasksApi();
	fenPenNov.close();
	tasksApiInstance.getTask(pensiDescriptio['GID']).then((exitus) =>
		{
			console.log(exitus.data)
		}, (error)=>
		{
			console.error(error.response.body);
		});
});



/*
 *  ____ __ __ __  __   ___ ______ __   ___  
 * ||    || || ||\ ||  //   | || | ||  // \\ 
 * ||==  || || ||\\|| ((      ||   || ((   ))
 * ||    \\_// || \||  \\__   ||   ||  \\_// 
 *                                          
 * *******************************************
 * Title: da-servatum-webhook
 * Descriptio: Servat signum numerium webhook in aerâ ut deleâtur cum ûtilitâs claudêtur
 * Intus: signum numerium webhook sessionis
 * Exitus: nil
 */

ipcMain.on("da-servatum-webhook", (e, webhookIDval) =>
{
	webhookID = webhookIDval;
})

/*
 *  ____ __ __ __  __   ___ ______ __   ___  
 * ||    || || ||\ ||  //   | || | ||  // \\ 
 * ||==  || || ||\\|| ((      ||   || ((   ))
 * ||    \\_// || \||  \\__   ||   ||  \\_// 
 *                                          
 * *******************************************
 * Title: word-constituere
 * Descriptio: Constituit scapum .docx in quo inscribuntur pensa asanae
 * Intus: lunae dies huius septimanae
 * Exitus: nil
 */

ipcMain.on("word-constituere", (e, hicLunaeDies, fluxum=false) => 
	{
	let annus = hicLunaeDies.getFullYear();
	let mensisNum = hicLunaeDies.getMonth();
	let lunaeDiesElm = hicLunaeDies.getDate();

	const dies = ["Sunday", "Monday", "Tuesday", "Wednesday",
	    "Thursday","Friday", "Saturday"];
	    
	    const menses = ["January", "February", "March",
	    "April", "May", "June", "July", "August",
	    "September", "October", "November", "December"];
	    const tnum = 909900090;
	    const fName = "Christopher";
	    const lName = "Davis";

	    let programName = ["TALENT SEARCH", "UPWARD BOUND", "EDUCATIONAL OPPORTUNITY CENTER"]
	    const ualrlogo = new docx.ImageRun({
		data: fs.readFileSync("./app_imgs/ua-little-rock-h-rgb-01.png"),
		transformation: {
		    width: 223,
		    height: 90,
		},
	    });

	    const borderStyle = {
	      top:{
		    style: docx.BorderStyle.SINGLE,
		    size: 5,
		    color: "#A5A5A5",
		},
		bottom: {
		    style: docx.BorderStyle.SINGLE,
		    size: 5,
		    color: "A5A5A5",
		},
		left: {
		    style: docx.BorderStyle.SINGLE,
		    size: 5,
		    color: "A5A5A5",
		},
		right: {
		    style: docx.BorderStyle.SINGLE,
		    size: 5,
		    color: "A5A5A5",
		}	
	    };

	    const iterHeaderText = [
		  new docx.TextRun({
		      text: "TRIO",
		      font: "Humana Sans ITC Std Light",
		      size: 28,
		  }),
		  new docx.TextRun({
		      text: " | ",
		      font: "Human Sans ITC Std Light",
		      size: 28,
		      color: "ff0000",
		      bold: true,
		  }),
		  new docx.TextRun({
		      text: programName[2],
		      font: "Britannic Bold",
		      size: 28,
		      characterSpacing: 50,
		  }),
		  new docx.TextRun({
		      text: "Employee Itinerary and Leave Report",
		      font: "Avenir Next LT Pro Light",
		      size: 40,
		  })
	    ]
	    const assignTableText = "";
	    const noteSectionText = "";
	    const leaveTableText = "";

	    //Condere titulos indicis pensorum in aera
	    let weekSchedule = 
	    [
		new docx.TableRow({
		    children: [
			new docx.TableCell({
			    children: [
				new docx.Paragraph({
				    children: [
					new docx.TextRun({
					    text: "Day",
					    font: "Avenir Next LT Pro Light",
					    size: 36,
					    bold: true,
					    color: "FFFFFF"
					})
				    ],
				    alignment: docx.AlignmentType.CENTER,
				})
			    ],
			    shading: {fill: "#A5A5A5"},
			    borders: borderStyle,
			}),
			new docx.TableCell({
			    children: [
				new docx.Paragraph({
				    children: [
					new docx.TextRun({
					    text: "Date",
					    font: "Avenir Next LT Pro Light",
					    size: 36,
					    bold: true,
					    color: "FFFFFF"
					})
				    ],
				    alignment: docx.AlignmentType.CENTER,
				})
			    ],
			    shading: {fill: "#A5A5A5"},
			    borders: borderStyle, 

			}),
			new docx.TableCell({
			    children: [
				new docx.Paragraph({
				    children: [
					new docx.TextRun({
					    text: "Weekly Assignments and Tasks",
					    font: "Avenir Next LT Pro Light",
					    size: 36,
					    bold: true,
					    color: "FFFFFF"
					})
				    ],
				    alignment: docx.AlignmentType.CENTER,
				})
			    ],
			    shading: {fill: "#A5A5A5"},
			    borders: borderStyle,
			}),
		    ]
		})
	    ];
	    
	    //Condere septimanae pensa in aera
            console.log("creatur spatium pensis");
	    for (let i = 0; i < 7; i++)
	    {
		let rowCont = [];
		//Preparare inscripta cuiusque quadrati
		for (let j = 0; j < 3; j++)
		{
		     let rowColor = ["#EDEDED","#FFFFFF"];
		     let rowWidth = [18,18, 64];
		     let lettrSize = 30;
		     let boldFace = false;
		     rowCont.push
		     (
			 new docx.TableCell({
			     width: {
				 size: rowWidth[j],
				 type: docx.WidthType.PERCENTAGE
			     },
			     children: [
				 new docx.Paragraph({
				     children: [
					 new docx.TextRun({
					     text: "",
					     font: "Avenir Next LT Pro Light",
					     size: lettrSize,
					     bold: boldFace
					 })
				     ]
				 })
			     ],
			     shading: {fill: rowColor[ i%2 ]},
			     borders: borderStyle,

			 })             
		     );
		}
		weekSchedule.push(new docx.TableRow({ children: rowCont}));
	    }
	    console.log("creatur spatium horarum otiorum")

	    //Condere titulos indicis horarum otiosarum in aera
	    let compHours = 
	    [
		new docx.TableRow({
		    children: [
			new docx.TableCell({
			    children: [
				new docx.Paragraph({
				    children: [
					new docx.TextRun({
					    text: "Leave Type",
					    font: "Avenir Next LT Pro Light",
					    size: 36,
					    bold: true,
					    color: "FFFFFF"
					})
				    ],
				    alignment: docx.AlignmentType.CENTER,
				})
			    ],
			    shading: {fill: "#A5A5A5"},
			    borders: borderStyle,
			}),
			new docx.TableCell({
			    children: [
				new docx.Paragraph({
				    children: [
					new docx.TextRun({
					    text: "Hours",
					    font: "Avenir Next LT Pro Light",
					    size: 36,
					    bold: true,
					    color: "FFFFFF"
					})
				    ],
				    alignment: docx.AlignmentType.CENTER,
				})
			    ],
			    shading: {fill: "#A5A5A5"},
			    borders: borderStyle,
			}),
		    ]
		})
	    ];


	    //Condere horas otiosas in aera
	    for (let i = 0; i < 6 ; i++)
	    {
		//Preparare inscripta cuiusque quadrati
		let dayVal = ["Vacation", "Sick Leave", "Comp Leave",
			"Authorized Absence", "Leave without Pay", "Cumulative Comp Leave"];
		let rowText = [dayVal[i], 0];
		let rowCont = [];
		
		for (let j = 0; j < 2; j++)
		{
		     let rowColor = ["#EDEDED","#FFFFFF"];
		     let rowWidth = [75, 25];
		     let lettrSize = 30;
		     let boldFace = false;
		     if (j == 1)
		     {
			 lettrSize = 20;
			 boldFace = false;
		     }
		     rowCont.push
		     (
			 new docx.TableCell({
			     width: {
				 size: rowWidth[j],
				 type: docx.WidthType.PERCENTAGE
			     },
			     children: [
				 new docx.Paragraph({
				     children: [
					 new docx.TextRun({
					     text: rowText[j],
					     font: "Avenir Next LT Pro Light",
					     size: lettrSize,
					     bold: boldFace
					 })
				     ]
				 })
			     ],
			     shading: {fill: rowColor[ i%2 ]},
			     borders: borderStyle,
			 })             
		     );
		}
		compHours.push(new docx.TableRow({ children: rowCont}));
	    }

	    console.log("Spatium adnotationibus aptum creatur");
	    const doc = new docx.Document
	    ({
		creator: fName +" "+lName,
		description: "Itinerary generated for " + tnum,
		title: "Weekly Itinerary for" +lName+fName+" on "+lunaeDiesElm+" "+menses[mensisNum]+" "+annus,
		sections: [
		    {
		       properties:{
			   page:{
				margin: {
				    right: 750,
				    bottom: 750,
				    left: 750,
				    header: 750,
				
				}
			    }
			   
			},
			headers : {
			    default: new docx.Header({
					children: [
			    new docx.Table({
				rows: [
				    new docx.TableRow({
					children: [
					   new docx.TableCell({
					       children: [new docx.Paragraph({ children: [ualrlogo]})],
					       verticalAlign: docx.VerticalAlign.CENTER,
					       borders: {
						   top: {style: docx.BorderStyle.NIL, size:0},
						   bottom: {style: docx.BorderStyle.NIL, size: 0},
						   left: {style: docx.BorderStyle.NIL, size: 0},
						   right: {style: docx.BorderStyle.NIL, size: 0}},
					   }),
					   new docx.TableCell({
					       children: [
						   new docx.Paragraph({alignment: docx.AlignmentType.RIGHT, children: [iterHeaderText[0],iterHeaderText[1],iterHeaderText[2]]}),
						   new docx.Paragraph({alignment:docx.AlignmentType.RIGHT, children: [iterHeaderText[3]]})
					       ],
					       verticalAlign: docx.VerticalAlign.CENTER,
					       borders: {
						   top: {style: docx.BorderStyle.NIL, size:0},
						   bottom: {style: docx.BorderStyle.NIL, size: 0},
						   left: {style: docx.BorderStyle.NIL, size: 0},
						   right: {style: docx.BorderStyle.NIL, size: 0}},
					   }),
				       ],
				   }),
				]
			    }),
			    ]
			}),
			},
			children: [
			    new docx.Paragraph({
				children: [
				    new docx.TextRun({
					text: "Name: " + fName + " " + lName,
					font: "Avenir Next LT Pro Light",
					size: 32,
					bold: true
				    })
				]
			    }),
			    new docx.Paragraph({children: []}),
			    new docx.Paragraph({children: []}),
			    new docx.Table({rows: weekSchedule}),
			]
		    }
		]
	    });
	    doc.addSection({
		properties: {
		    type:docx.SectionType.CONTINUOUS,
		    page:{
			margin: {
			    right: 750,
			    bottom: 750,
			    left: 750,
			    header: 750,
				
			}
		    }
		},
		children: [
			    new docx.Table({ rows: [
				new docx.TableRow({
				    children: [
					new docx.TableCell({
					    width:{
						size: 1000000,
						type: docx.WidthType.DXA
					    },
					    children: [new docx.Paragraph({
						 alignment: docx.AlignmentType.LEFT,
						 children:[
						     new docx.TextRun({
							 text: "Notes:",
							 font: "Avenir Next LT Pro Light",
							 size: 32,
							 bold: true
						     })
						 ]
					     })
					     ],
					     verticalAlign: docx.VerticalAlign.CENTER,
					     borders: {
						 //top: {style: docx.BorderStyle.NIL, size: 0},
						 bottom: {style: docx.BorderStyle.NIL, size: 0},
						 //left: {style: docx.BorderStyle.NIL, size: 0},
						 //right: {style: docx.BorderStyle.NIL, size: 0}
					     },
					}),
				    ],
				}),
				new docx.TableRow({
				    children: [
					new docx.TableCell({
					    width:{
						size: 100,
						type: docx.WidthType.PERCENTAGE
					    },
					    children: [new docx.Paragraph({
						 alignment: docx.AlignmentType.LEFT,
						 children:[
						     new docx.TextRun({
							 text: "",
							 font: "Avenir Next LT Pro Light",
							 size: 14,
							 bold: false
						     })
						 ]
					     })
					     ],
					     verticalAlign: docx.VerticalAlign.CENTER,
					     borders: {
						 top: {style: docx.BorderStyle.NIL, size: 0},
					     },
					}),
				    ],
				}),

			    ]}),
			],
	   });
	    doc.addSection({
		properties: {
		    type:docx.SectionType.CONTINUOUS,
		    page:{
			margin: {
			    right: 750,
			    bottom: 750,

			    left: 750,
			    header: 750,
				
			}
		    }
		},
		children: [
			    new docx.Paragraph({children: []}),
			    new docx.Table({rows: compHours}),
		]
	     });

	   docx.Packer.toBuffer(doc).then((buffer) => {

		let iterprint_file = iterpath(".docx", hicLunaeDies);
                
                if(fluxum && iterprint_file["read"])
		{
                    iterprint_file = iterprint_file["read"];
                }
                else
                {
                    iterprint_file = iterprint_file["write"];
			}
		fs.writeFileSync(iterprint_file, buffer);
		console.log("saved: " + iterprint_file);
	    });
		return 0;
	});

ipcMain.on("da-asanae-pensula", async (e, pensiGID) =>
{
	
	let client = Asana.ApiClient.instance;
	let token = client.authentications['token'];
	token.accessToken = ''


	let tasksApiInstance = new Asana.TasksApi();
	let opts = {
		'opt_fields': "nameactual_time_minutes,approval_status,assignee,assignee.name,assignee_section,assignee_section.name,assignee_status,completed,completed_at,completed_by,completed_by.name,created_at,created_by,custom_fields,custom_fields.asana_created_field,custom_fields.created_by,custom_fields.created_by.name,custom_fields.currency_code,custom_fields.custom_label,custom_fields.custom_label_position,custom_fields.date_value,custom_fields.date_value.date,custom_fields.date_value.date_time,custom_fields.description,custom_fields.display_value,custom_fields.enabled,custom_fields.enum_options,custom_fields.enum_options.color,custom_fields.enum_options.enabled,custom_fields.enum_options.name,custom_fields.enum_value,custom_fields.enum_value.color,custom_fields.enum_value.enabled,custom_fields.enum_value.name,custom_fields.format,custom_fields.has_notifications_enabled,custom_fields.is_formula_field,custom_fields.is_global_to_workspace,custom_fields.is_value_read_only,custom_fields.multi_enum_values,custom_fields.multi_enum_values.color,custom_fields.multi_enum_values.enabled,custom_fields.multi_enum_values.name,custom_fields.name,custom_fields.number_value,custom_fields.people_value,custom_fields.people_value.name,custom_fields.precision,custom_fields.resource_subtype,custom_fields.text_value,custom_fields.type,dependencies,dependents,due_at,due_on,external,external.data,followers,followers.name,hearted,hearts,hearts.user,hearts.user.name,html_notes,is_rendered_as_separator,liked,likes,likes.user,likes.user.name,memberships,memberships.project,memberships.project.name,memberships.section,memberships.section.name,modified_at,name,notes,num_hearts,num_likes,num_subtasks,parent,parent.created_by,parent.name,parent.resource_subtype,permalink_url,projects,projects.name,resource_subtype,start_at,start_on,tags,tags.name,workspace,workspace.name"
	};

	tasksApiInstance.getSubtasksForTask(pensiGID,opts).then((dataPensula) =>
		{
			win.webContents.send("data-asanae-pensula", dataPensula.data)
		});

});
ipcMain.on("da-asanae-pensum", (e, pensiGID) =>
{
	let client = Asana.ApiClient.instance;
	let token = client.authentications['token'];
	token.accessToken = ''

	let tasksApiInstance = new Asana.TasksApi();
	let opts = {
		'opt_fields': "nameactual_time_minutes,approval_status,assignee,assignee.name,assignee_section,assignee_section.name,assignee_status,completed,completed_at,completed_by,completed_by.name,created_at,created_by,custom_fields,custom_fields.asana_created_field,custom_fields.created_by,custom_fields.created_by.name,custom_fields.currency_code,custom_fields.custom_label,custom_fields.custom_label_position,custom_fields.date_value,custom_fields.date_value.date,custom_fields.date_value.date_time,custom_fields.description,custom_fields.display_value,custom_fields.enabled,custom_fields.enum_options,custom_fields.enum_options.color,custom_fields.enum_options.enabled,custom_fields.enum_options.name,custom_fields.enum_value,custom_fields.enum_value.color,custom_fields.enum_value.enabled,custom_fields.enum_value.name,custom_fields.format,custom_fields.has_notifications_enabled,custom_fields.is_formula_field,custom_fields.is_global_to_workspace,custom_fields.is_value_read_only,custom_fields.multi_enum_values,custom_fields.multi_enum_values.color,custom_fields.multi_enum_values.enabled,custom_fields.multi_enum_values.name,custom_fields.name,custom_fields.number_value,custom_fields.people_value,custom_fields.people_value.name,custom_fields.precision,custom_fields.resource_subtype,custom_fields.text_value,custom_fields.type,dependencies,dependents,due_at,due_on,external,external.data,followers,followers.name,hearted,hearts,hearts.user,hearts.user.name,html_notes,is_rendered_as_separator,liked,likes,likes.user,likes.user.name,memberships,memberships.project,memberships.project.name,memberships.section,memberships.section.name,modified_at,name,notes,num_hearts,num_likes,num_subtasks,parent,parent.created_by,parent.name,parent.resource_subtype,permalink_url,projects,projects.name,resource_subtype,start_at,start_on,tags,tags.name,workspace,workspace.name"
	};
	console.log(pensiGID);
	tasksApiInstance.getTask(pensiGID, opts).then((datum_pensum) => {
		win.webContents.send("datum-asanae-pensum", datum_pensum.data)
		}, (error) => {
			console.error(error.response.body)
		});

	win.webContents.send("itinerarium_promptum")
});

ipcMain.on("da-asanae-diem", (e, diesGid, diesNomen) => {

	let tasksApiInstance = new Asana.TasksApi();
	let opts = {
		'opt_fields': "memberships.section.name"
	};
	tasksApiInstance.getTasksForSection(diesGid, opts).then((dataPensaDiei) => {
		win.webContents.send("datus-asanae-dies", dataPensaDiei.data)
	});
/*
	let huiusDieiPensaGid = [];
	dataPensa.data.forEach((pensum) =>
				{
					huiusDieiPensaGid.push(pensum.gid);
				});
				return huiusDieiPensaGid;
			}, (error) => {
				console.error(error.response.body);
			}).then((pensaDiei) => {
				pensaCollectaSept.push(pensaDiei);
				if (pensaCollectaSept.length == 5) {return pensaCollectaSept}	
			}, (error) => {
				console.error(error.response.body)
			}).then ((pensaCollecta) => {
				console.log(pensaCollecta.length);
			}, (error) => {
				console.error(error.response.body);
			});*/

});

ipcMain.on("da-asanae-sectiones", (e, conditiones) => {
	let client = Asana.ApiClient.instance;
	let token = client.authentications['token'];
	token.accessToken = ''
	let sectionsApiInstance = new Asana.SectionsApi();
	let project_gid = 1205863566705210;
	let opts = {
		'limit': 10,
	};

	sectionsApiInstance.getSectionsForProject(project_gid, opts).then((datae_sectiones) => {
		console.log('Week tasks loaded. Returned')
		let pensaCollectaSept = []
		let sectDierum = datae_sectiones.data.slice(2,7);
		win.webContents.send("datae-asanae-sectiones", sectDierum)
	}, (error) => {
		console.error(error.response.body)
	})
});

const vacuane = (res)=>
{
	return (res && Object.keys(res).length === 0 && res.constructor === Object);
}

function iterpath(filetype, monDate = mondayData())
{
    let annus = monDate.getFullYear();
    const monthNum = monDate.getMonth();
    const mondayDate = monDate.getDate();

    const fName = "Christopher";
    const lName = "Davis";

    const menses = ["January", "February", "March",
    "April", "May", "June", "July", "August",
    "September", "October", "November", "December"];

    //computa annum fiscalem
    if (monthNum < 7)
    {
        annus -= 1;
    }

    const fiscalyear = annus +"_"+(annus+1);

    //compone locum loculamenti

    const monthMarked = monDate.getFullYear()+"_"+(monthNum + 1)+"_"+menses[monthNum];

    const iter_dir = [
	    "../",
	    "../",
	    "../",
        ".itineraries",
        fiscalyear,
	monthMarked,
        ""];

    //compone locum itinerarii
    let iter_name = [lName+fName,
         "Wk_Iter",
         mondayDate+menses[monthNum]+annus];

    const iterfile = iter_dir.join("/") + iter_name.join("_");

    if(filetype=="")
	    {
        return iter_dir.join("/");
    }
    else if (filetype == ".json")
    {

         return iterfile+filetype;
    }
    else
    {
        let version = 0;
 	let versionSuffix = "";
	let latestFound = false;
        while(!latestFound)
        {   
            version++; 
            versionSuffix = "_v" + version + filetype; 
            latestFound = !(fs.existsSync(iterfile+versionSuffix));
        }
	
        if (version == 1) { return  {"write": iterfile + versionSuffix, "read": false};}
        return {"write":iterfile + versionSuffix, "read": iterfile+"_v" + (version -1) + filetype};
    }
}
