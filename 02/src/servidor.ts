// Declaraciones
import express = require("express")
import {Application, Request, Response, NextFunction} from 'express'
import bodyParser = require("body-parser")
import methodOverride = require("method-override")  // es un middleware
import * as morgan from 'morgan'		//es otro middleware (morgan no bloquea nada, solo registra)

// Settings
const app:Application = express()
app.set("view engine", "pug")
app.set("views", "./vistas")

// Middlewares
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride("_method"))

// Rutas
app.get("/", (req: Request, res: Response, next: NextFunction) => {
	res
		.status(200)
		.type("text/plain")
		.send("todo ok")
})

app.post("/", (req: Request, res: Response, next: NextFunction) => {
	res
		.status(200)
		.type("application/json")
		.send(JSON.stringify(req.body))
})

app.put("/registro", (req: Request, res: Response, next: NextFunction) => {
	res
		.status(200)
		.type("text/plain")
		.send("Enviado usando el metodo PUT")
})

app.get("/formulario", (req: Request, res: Response, next: NextFunction) => {
	res.render("formulario")
})

// El servidor
app.listen(4000, () => {
	console.log("Ejecutando en el puerto 4000")
})


//http://localhost:4000/formulario
//http://localhost:4000/registro?_method=PUT
