
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
					let licitiCanales = ["PQSME", "describe-pensum","da-asanae-pensum","da-asanae-sectiones", "da-asanae-diem",  "da-asanae-pensula", "word-constituere", "json-constituere","adde-pensum"];
			if (licitiCanales.includes(canalis))
			{
				ipcRenderer.send(canalis, conditiones);
			}
		},
		ab: (canalis, functio) =>
		{
				let licitiCanales = ["mongodb-ignotum", "mongodb-notum","creatum-pensum","data-asanae-pensula","datum-asanae-pensum","datae-asanae-sectiones", "datus-asanae-dies", "itinerarium_promptum"]
			if (licitiCanales.includes(canalis)){
				//"Deliberately stirp event as it includes 'sender'
				ipcRenderer.on(canalis, (event, conditiones) => functio(conditiones));
			}
		}
	}
);

