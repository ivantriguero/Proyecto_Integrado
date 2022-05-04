import {pool} from '../../../config/bd'
import { serverRuntimeConfig } from '../../../next.config'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
  switch (req.method){
    case "GET":
      const [rows]=await pool.query("SELECT * FROM proyectointegrado.Usuario join Donante on idUsuario=idDonante;")
      return res.status(200).json(rows)
    case "POST":
      const email=req.body.email
      const clave=req.body.clave
      const nombre=req.body.nombre
      const dni=req.body.dni
      const telefono=req.body.telefono
      const [r]=await pool.query("INSERT INTO `proyectointegrado`.`Usuario` (`emailUsuario`, `claveUsuario`, `tipoUsuario`) VALUES ('"+email+"', sha('"+clave+"'), 'don');")
      await pool.query("INSERT INTO `proyectointegrado`.`Donante` (`idDonante`, `nombreDonante`, `dniDonante`, `telefonoDonante`) VALUES ('"+r.insertId+"', '"+nombre+"', '"+dni+"', '"+telefono+"');")
      return res.status(200).json(r)
    case "PUT":
      console.log(req.method)
      const ide= req.body.id
      const emaile=req.body.email
      const clavee=req.body.clave
      const nombree=req.body.nombre
      const dnie=req.body.dni
      const telefonoe=req.body.telefono
      if (clavee==""){
        await pool.query("UPDATE `proyectointegrado`.`Usuario` SET `emailUsuario` = '"+emaile+"' WHERE (`idUsuario` = '"+ide+"');")
      }else if(clavee!==""){
        await pool.query("UPDATE `proyectointegrado`.`Usuario` SET `emailUsuario` = '"+emaile+"', `claveUsuario` = '"+clavee+"' WHERE (`idUsuario` = '"+ide+"');")
      }
      await pool.query("UPDATE `proyectointegrado`.`Donante` SET `nombreDonante` = '"+nombree+"', `dniDonante` = '"+dnie+"', `telefonoDonante` = '"+telefonoe+"' WHERE (`idDonante` = '"+ide+"');")
      console.log({
        ide,
        emaile,
        clavee,
        nombree,
        dnie,
        telefonoe
      })
      return  res.status(200).json({
        message: "Editando usuario..."
      })
  }
}