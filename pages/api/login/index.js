import {pool} from '../../../config/bd'
import { serverRuntimeConfig } from '../../../next.config'
import jwt from 'jsonwebtoken'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req, res){
    const {email, clave}= req.body
    const [rows]= await pool.query("SELECT * FROM Usuario WHERE emailUsuario='"+email+"' AND claveUsuario=SHA('"+clave+"');")
    if(rows.length==0){
        res.status(403).json({menssage:"Este usuario no existe"})
    }else{
        const [Usuario]=rows
        const idUsuario=Usuario.idUsuario
        const emailUsuario=Usuario.emailUsuario
        const tipoUsuario=Usuario.tipoUsuario
    
        const token = jwt.sign({idUsuario, emailUsuario, tipoUsuario}, serverRuntimeConfig.secret, {expiresIn: '2h'})
        res.status(200).json(
            token
        )
    }
}

