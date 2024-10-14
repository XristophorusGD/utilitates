
const {contextBridge, ipcRenderer} = require("electron");

window.addEventListener('DOMContentLoaded', () => {
	const replaceText = (selector, text) => {
		const element = document.getElementById(selector)
		if (element) element.innerText = text
	}

	for (const dependency of ['chrome', 'node', 'electron']) {
		replaceText(`${dependency}-version`, process.versions[dependency])
	}
})


contextBridge.exposeInMainWorld(
	"Asana", {
		ad: (canalis, conditiones) =>
		{
			//approbatio iussorum - index cresci potest
					let licitiCanales = ["itinerarium-restituere","aditum-ad-asanam","pqsme-mongo-oauth", "describe-pensum","word-constituere", "json-constituere","adde-pensum"];
			if (licitiCanales.includes(canalis))
			{
				ipcRenderer.send(canalis, conditiones);
			}
		},
		ab: (canalis, functio) =>
		{
				let licitiCanales = ["oauth-aditus-asanae", "mongodb-ignotum", "mongodb-notum","creatum-pensum", "itinerarium_promptum"]
			if (licitiCanales.includes(canalis)){
				//"Deliberately stirp event as it includes 'sender'
				ipcRenderer.on(canalis, (event, conditiones) => functio(conditiones));
			}
		}
	}
);

