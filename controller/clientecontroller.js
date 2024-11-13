import mongoose from 'mongoose';
import cliente from '../module/cliente.js';
import estadocliente from  '../module/estado_cliente.js'

export async function obtenercliente(req,res) {
    const clientes = await cliente.find().populate('id_estado');
    res.json(clientes)
}

export  async function crearcliente(req,res) {
    try {
        const {nombre,apellido,email,tipo_documento,documento,telefono,direccion,id_estado,contraseña,observacion} = req.body
        const newcliente = new cliente({
            nombre,
            apellido,
            email,
            tipo_documento,
            documento,
            telefono,
            direccion,
            id_estado,
            contraseña,
            observacion
        })
        await newcliente.save();
        res.json('cleinte creado')
    }catch(error){
    
        res.json('problemas con la creacion')
    }
}

export async function actualizarcliente(req,res) {
    try{
        const _id = req.params.id
        const {nombre,apellido,email,tipo_documento,documento,telefono,direccion,id_estado,contraseña,observacion} = req.body
        await cliente.findByIdAndUpdate({_id:_id},{nombre:nombre,documento:documento,apellido:apellido,email:email,tipo_documento:tipo_documento,
                telefono:telefono,direccion:direccion,contraseña:contraseña, id_estado:id_estado,observacion:observacion})
        res.json('actualizacion exictosa')
    }catch(error){
        res.json('problemas con la actualizacion')
    }
}


export async function eliminarcliente(req,res) {
    try{
        const _id = req.params.id
        await cliente.findByIdAndDelete(_id)
        res.json('cliente eliminado ')
    }catch(error){
        res.json('problemas al eliminar ')
    }
}

export async function asignarestado(req,res) {
    try {
        const {id_cliente,id_estado} = req.body
        const clientes = await cliente.findById(id_cliente)
        const estados = await estadocliente.findById(id_estado)
        
        clientes.id_estado = estados._id
        await clientes.save()
        res.json({message:'estado asignado:',cliente:clientes})

    }catch(error){
        res.json('problema con asignar estado')
    }
}
