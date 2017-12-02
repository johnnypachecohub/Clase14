// Declaraciones
import express = require("express")
import {Application, Request, Response, NextFunction} from 'express'

// Settings
const app:Application = express()

// Middlewares
//localhost:4000/assets/img/perro.jpg
//http://localhost:4000/
/*app.use("/assets", (req: Request, res: Response, next: NextFunction) => {
	//no le ponemos type para que node decida el tipo (ya que puede ser un jpg, de repente luego un gif, etc)
	res
		.status(200)
		.sendFile(__dirname + "/public" + req.url)  //req.url = img/perro.jpg
})
*/
//app.use("/assets", express.static("public"))  //esta linea hace lo mismo que el bloque anterior (aplica solo para la ruta assets)
app.use(express.static("public"))   //aplica para cualquier ruta

// Rutas
app.get("/", (req: Request, res: Response, next: NextFunction) => {
	res
		.status(200)
		.type("text/html")
		.sendFile(__dirname + "/home.html")
})


// El servidor
app.listen(4000, () => {
	console.log("Ejecutando en el puerto 4000")
})