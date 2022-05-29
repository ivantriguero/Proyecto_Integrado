import {pool} from '../../../config/bd'
import { serverRuntimeConfig } from '../../../next.config'
import jwt from 'jsonwebtoken'

export default async function handler(req, res){
    const { token } = req.query
    try{
        var decoded = jwt.verify(token, serverRuntimeConfig.secret);
        const [r]=await pool.query("SELECT token FROM proyectointegrado.Usuario where emailUsuario='"+decoded.email+"';")
        if(r[0].token==decoded.code){
            return res.status(200).redirect('/recuperarpass/'+decoded.code)
        }else{
            return res.status(403).redirect('/errorEmail')
        }
    } catch(error){
        console.log(error)
        const email = req.body.email
        return res.status(403).redirect('/errorEmail')

    }

    return res.status(200).redirect('/')
    
}

