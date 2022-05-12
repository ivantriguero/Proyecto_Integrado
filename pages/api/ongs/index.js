import {pool} from '../../../config/bd'
import { serverRuntimeConfig } from '../../../next.config'
import jwt from 'jsonwebtoken'

const authenticated = (fn) => async (
  req,
  res
) => {
  jwt.verify(req.headers.authorization, serverRuntimeConfig.secret, async function(err, decoded){
      if(!err && decoded){
          return await fn(req,res)
      }

      res.status(403).json({message : 'No estás autenticado'})
  })
}

export default authenticated(async function handler(req, res) {
  switch (req.method){
    case "GET":
      const [rows]=await pool.query("SELECT * from Usuario join ONG on idONG=idUsuario;")
      return res.status(200).json(rows)
    case "POST":
      const idi= req.body.id
      const nombre=req.body.nombre
      const descripcion=req.body.descripcion
      const email=req.body.email
      const clave=req.body.clave
      const direccion=req.body.direccion
      const telefono=req.body.telefono
      const [r]=await pool.query("INSERT INTO `proyectointegrado`.`Usuario` (`emailUsuario`, `claveUsuario`, `tipoUsuario`) VALUES ('"+email+"', sha('"+clave+"'), 'don');")
      await pool.query("INSERT INTO `proyectointegrado`.`ONG` (`idONG`, `nombreONG`, `descripcionONG`, `direccionONG`, `telefonoONG`) VALUES ('"+r.insertId+"', '"+nombre+"', '"+descripcion+"', '"+direccion+"', '"+telefono+"');")
      return res.status(200).json(r)
    case "PUT":
      const ide= req.body.id
      const nombree=req.body.nombre
      const descripcione=req.body.descripcion
      const emaile=req.body.email
      const clavee=req.body.clave
      const direccione=req.body.direccion
      const telefonoe=req.body.telefono
      if (clavee==""){
        await pool.query("UPDATE `proyectointegrado`.`Usuario` SET `emailUsuario` = '"+emaile+"' WHERE (`idUsuario` = '"+ide+"');")
      }else if(clavee!==""){
        await pool.query("UPDATE `proyectointegrado`.`Usuario` SET `emailUsuario` = '"+emaile+"', `claveUsuario` = SHA('"+clavee+"') WHERE (`idUsuario` = '"+ide+"');")
      }
      const re=await pool.query("UPDATE `proyectointegrado`.`ONG` SET `nombreONG` = '"+nombree+"', `descripcionONG` = '"+descripcione+"', `direccionONG` = '"+direccione+"', `telefonoONG` = '"+telefonoe+"' WHERE (`idONG` = '"+ide+"');")
      return res.status(200).json(re).end()
    case "DELETE":
      const id=req.body.id
      await pool.query("DELETE FROM `proyectointegrado`.`ONG` WHERE (`idONG` = '"+id+"');")
      await pool.query("DELETE FROM `proyectointegrado`.`Usuario` WHERE (`idUsuario` = '"+id+"');")
      return res.status(200).json(id)
  }
})