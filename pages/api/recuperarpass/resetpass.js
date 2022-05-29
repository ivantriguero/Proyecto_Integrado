import {pool} from '../../../config/bd'
import { serverRuntimeConfig } from '../../../next.config'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
      const {code, clave, id}= req.body
      const [rows]=await pool.query("UPDATE `proyectointegrado`.`Usuario` SET `claveUsuario` = SHA('"+clave+"') WHERE (`token` = '"+code+"');")
      await pool.query(" UPDATE `proyectointegrado`.`Usuario` SET `token` = NULL WHERE (`idUsuario` = '"+id+"');")
      return res.status(200).json({
          message:'clave modificada'
      })
}