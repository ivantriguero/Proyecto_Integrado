import {pool} from '../../../config/bd'
import { serverRuntimeConfig } from '../../../next.config'
import jwt from 'jsonwebtoken'
import { getTemplate, sendEmail } from '../../../config/mail.config'
import { uuid } from 'uuidv4';

export default async function handler(req, res){
    const {email, clave, nombre, descripcion, direccion, telefono, tipoUsuario}= req.body
    const [rows]= await pool.query("SELECT * FROM proyectointegrado.Usuario where emailUsuario='"+email+"';")
    if(rows.length==0){
        
        const code = uuid()
        
        const token = jwt.sign({email, code}, serverRuntimeConfig.secret, {expiresIn: '24h'})
        
        const template = getTemplate(nombre,token, email)
        
        if(tipoUsuario=='don'){
            const {dni} = req.body
            const [r]=await pool.query("INSERT INTO `proyectointegrado`.`Usuario` (`emailUsuario`, `claveUsuario`, `tipoUsuario`, `token`, `confirmado`) VALUES ('"+email+"', SHA('"+clave+"'), 'don', '"+code+"' , 0);")
            await pool.query("INSERT INTO `proyectointegrado`.`Donante` (`idDonante`, `nombreDonante`, `dniDonante`, `telefonoDonante`) VALUES ('"+r.insertId+"', '"+nombre+"', '"+dni+"', '"+telefono+"');")
        }else if(tipoUsuario=='ong'){
            const [r]=await pool.query("INSERT INTO `proyectointegrado`.`Usuario` (`emailUsuario`, `claveUsuario`, `tipoUsuario`, `token`, `confirmado`) VALUES ('"+email+"', SHA('"+clave+"'), 'ong', '"+code+"', 0);")
            await pool.query("INSERT INTO `proyectointegrado`.`ONG` (`idONG`, `nombreONG`, `descripcionONG`, `direccionONG`, `telefonoONG`) VALUES ('"+r.insertId+"', '"+nombre+"', '"+descripcion+"', '"+direccion+"', '"+telefono+"');")
        }
        await sendEmail(email, 'Confirmar email',template)
        res.status(200).json(
            token
        )
    }else{
        res.status(403).json({error:"Este email ya existe"})
    }
}

