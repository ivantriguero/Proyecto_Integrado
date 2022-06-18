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
  var token=jwt.verify(req.headers.authorization, serverRuntimeConfig.secret)
  switch (req.method){
    case "GET":
      if(req.query.id!=null){
        const [rows]=await pool.query("SELECT * from Proyecto left join Donacion on Donacion.idProyecto=Proyecto.idProyecto left join Donante on Donante.idDonante=Donacion.idDonante where Proyecto.idProyecto="+req.query.id+";")
        return res.status(200).json(rows)
      }
      const [rows]=await pool.query("SELECT * from Proyecto;")
      console.log(rows)
      return res.status(200).json(rows)
    case "POST":
      const titulo=req.body.titulo
      const descripcion=req.body.descripcion
      const fechaLimite=req.body.fechaLimite
      const fecha=req.body.fecha
      const [r]=await pool.query("INSERT INTO `proyectointegrado`.`Proyecto` (`tituloProyecto`, `descripcionProyecto`, `dineroProyecto`, `fechaProyecto`, `fechaLimiteProyecto`, `idONG`) VALUES ('"+titulo+"', '"+descripcion+"', '0', '"+fecha+"', '"+fechaLimite+"', "+token.idUsuario+");")
      return res.status(200).json(r)
    case "PUT":
      const ide= req.body.id
      const tituloe=req.body.titulo
      const descripcione=req.body.descripcion
      const fechaLimitee=req.body.fechaLimite
      const fechae=req.body.fecha
      const re=await pool.query("UPDATE `proyectointegrado`.`Proyecto` SET `tituloProyecto` = '"+tituloe+"', `descripcionProyecto` = '"+descripcione+"', `fechaProyecto` = '"+fechae+"', `fechaLimiteProyecto` = '"+fechaLimitee+"' WHERE (`idProyecto` = '"+ide+"');")
      return res.status(200).json(re)
    case "DELETE":
      const id=req.body.id
      await pool.query("DELETE FROM `proyectointegrado`.`Proyecto` WHERE (`idProyecto` = '"+id+"');")
      return res.status(200).json(id)
  }
})