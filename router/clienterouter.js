import Router from 'express'
const routercliente = Router()

import {obtenercliente,crearcliente,actualizarcliente,eliminarcliente,asignarestado } from '../controller/clientecontroller.js'

routercliente.get('/',obtenercliente)
routercliente.post('/',crearcliente)
routercliente.path('/asignar',asignarestado)
routercliente.put('/:id',actualizarcliente)
routercliente.delete('/:id',eliminarcliente)


export default routercliente