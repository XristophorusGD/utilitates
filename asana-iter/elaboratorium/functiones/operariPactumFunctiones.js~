/**immutabiles instrumenta ====================================================================================
*      _    _____ ____      _    _____   ___ __  __ __  ____     _______  _    ____ ___ _     _____ ____
*     / \  | ____|  _ \    / \  | ____| |_ _|  \/  |  \/  \ \   / /_   _|/ \  | __ )_ _| |   | ____/ ___|
*    / _ \ |  _| | |_) |  / _ \ |  _|    | || |\/| | |\/| |\ \ / /  | | / _ \ |  _ \| || |   |  _| \___ \
*   / ___ \| |___|  _ <  / ___ \| |___   | || |  | | |  | | \ V /   | |/ ___ \| |_) | || |___| |___ ___) |
*  /_/   \_\_____|_| \_\/_/   \_\_____| |___|_|  |_|_|  |_|  \_/    |_/_/   \_\____/___|_____|_____|____/
*
*/

// Insturmentorum indices
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios")
const path = require("path")
const repositorium = require('../../repositorium_datorum/repositorium');

require('dotenv').config();

// Data
const VERVM = true;
const FALSVM = false;

exports.operari = (petitum, responsum) =>
{
	responsum.sendFile(path.join(__dirname, "../..","static/html/operariTRIOForecaster.html"))
}
