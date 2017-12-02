// Declaraciones
import express = require("express")
import {Application, Request, Response, NextFunction} from 'express'

// Settings
const app:Application = express()
//vamos a usar el motor de plantilla:
app.set("view engine", "pug")
//donde esta ubicado
app.set("views", "./vistas")

// Middlewares


// Rutas
app.get("/", (req: Request, res: Response, next: NextFunction) => {
	res.render("home", {
		titulo: "Curso FS Javascript",
		pagina: "El Comercio",
		url: "http://elcomercio.pe",
		usuarios: [
			{id: 1, nombre: "Nombre 1"},
			{id: 2, nombre: "Nombre 2"},
			{id: 3, nombre: "Nombre 3"}
		]
	})

})


// El servidor
app.listen(4000, () => {
	console.log("Ejecutando en el puerto 4000")
})