// Declaraciones
import express = require("express")
import {Application, Request, Response, NextFunction} from 'express'
import bodyParser = require("body-parser")
import methodOverride = require("method-override")  // es un middleware
import * as morgan from 'morgan'		//es otro middleware (morgan no bloquea nada, solo registra)
import * as mongoose from "mongoose"
import {conexionMongo} from './config/conexiones'
import Usuario from './api/modelos/Usuarios'

// Settings
const app:Application = express()
app.set("view engine", "pug")
app.set("views", "./vistas")

mongoose.connect(conexionMongo, {
	useMongoClient: true
})

// Middlewares
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride("_method"))

// Rutas
app.get("/", (req: Request, res: Response, next: NextFunction) => {
	res
		.status(200)
		.type("text/plain")
		.send("Home")
})

app.get("/usuario/registro", (req: Request, res: Response, next: NextFunction) => {
	res.render("usuarioFormulario")
})

app.post("/usuario", (req: Request, res: Response, next: NextFunction) => {
	const nombre = req.body.nombre
	const apellido = req.body.apellido

	//solo se usa el new cuando agregamos usuarios
	const usuario = new Usuario()
	usuario["nombre"] = nombre
	usuario["apellido"] = apellido

	usuario
		.save()
		.then(registro => {
			res.redirect("/usuario")
		})
		.catch(error => {
			res
				.status(500)
				.type("text/plain")
				.send(error)
		})
})

app.get("/usuario", (req: Request, res: Response, next: NextFunction) => {
	Usuario
		.find({})
		.then(registros => {
			res.json(registros)
		})
		.catch(error => {
			res
				.status(500)
				.type("text/plain")
				.send(error)
		})
})

// El servidor
app.listen(4000, () => {
	console.log("Ejecutando en el puerto 4000")
})


//http://localhost:4000/usuario/registro
