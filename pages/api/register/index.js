import {pool} from '../../../config/bd'
import { serverRuntimeConfig } from '../../../next.config'
import jwt from 'jsonwebtoken'
import { getTemplate, sendEmail } from '../../../config/mail.config'
import { uuid } from 'uuidv4';

export default async function handler(req, res){
    const {email, clave, nombre, dni, telefono}= req.body
    console.log(email)
    const [rows]= await pool.query("SELECT * FROM proyectointegrado.Usuario where emailUsuario='"+email+"';")
    if(rows.length==0){
        
        const code = uuid()
        
        const token = jwt.sign({email, code}, serverRuntimeConfig.secret, {expiresIn: '24h'})
        
        const template = getTemplate(nombre,token)
        
        console.log(code)
        console.log(code.length)

        const [r]=await pool.query("INSERT INTO `proyectointegrado`.`Usuario` (`emailUsuario`, `claveUsuario`, `tipoUsuario`, `token`) VALUES ('"+email+"', SHA('"+clave+"'), 'don', '"+code+"');")
        await pool.query("INSERT INTO `proyectointegrado`.`Donante` (`idDonante`, `nombreDonante`, `dniDonante`, `telefonoDonante`) VALUES ('"+r.insertId+"', '"+nombre+"', '"+dni+"', '"+telefono+"');")
        await sendEmail(email, 'Email de prueba',template)
        res.status(200).json(
            token
        )
    }else{
        res.status(403).json({error:"Este email ya existe"})
    }
}

