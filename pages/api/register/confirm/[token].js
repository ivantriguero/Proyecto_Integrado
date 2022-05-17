import {pool} from '../../../../config/bd'
import { serverRuntimeConfig } from '../../../../next.config'
import jwt from 'jsonwebtoken'

export default async function handler(req, res){
    const { token } = req.query
    try{
        var decoded = jwt.verify(token, serverRuntimeConfig.secret);
        console.log(decoded)
        const [r]=await pool.query("SELECT token FROM proyectointegrado.Usuario where emailUsuario='"+decoded.email+"';")
        if(r[0].token==decoded.code){
            await pool.query("UPDATE `proyectointegrado`.`Usuario` SET `token` = NULL WHERE (`emailUsuario` = '"+decoded.email+"');")
            return res.status(200).redirect('/confirmaEmail')
        }else{
            return res.status(403).redirect('/errorEmail')
        }
        console.log(r[0].token)
    } catch(error){
        console.log(error)
        return res.status(403).redirect('/errorEmail')
    }

    return res.status(200).redirect('/')
    
}

