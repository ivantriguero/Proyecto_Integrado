import {pool} from '../../../config/bd'
import { serverRuntimeConfig } from '../../../next.config'
import jwt from 'jsonwebtoken'
import { getTemplateRecuperarPass, sendEmail } from '../../../config/mail.config'
import { uuid } from 'uuidv4';


export default async function handler(req, res){
    const {email}= req.body
    const [rows]= await pool.query("SELECT * FROM Usuario WHERE emailUsuario='"+email+"';")
    if(rows.length==0){
        res.status(403).json({message:"Este correo no existe"})
    }else{
        const [Usuario]=rows
        const idUsuario=Usuario.idUsuario
        const emailUsuario=Usuario.emailUsuario
        const tipoUsuario=Usuario.tipoUsuario
        const confirmado=Usuario.confirmado

        const code = uuid()
        
        const token = jwt.sign({email, code}, serverRuntimeConfig.secret, {expiresIn: '24h'})
        
        const template = getTemplateRecuperarPass(token, email)

        if(confirmado==0){
            res.status(403).json({message:"Este email no está confirmado"})
        }else{
            try{
                const [r]=await pool.query("UPDATE `proyectointegrado`.`Usuario` SET `token` = '"+code+"' WHERE (`emailUsuario` = '"+email+"');")
                await sendEmail(email, 'Recuperar contraseña',template)
                res.status(200).json({
                    message:'correo enviado'
                })
            }catch(error){
                res.status(500).json(
                    error
                )
            }
        }
    }
}

