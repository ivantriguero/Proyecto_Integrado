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
      console.log(req.headers)
      res.status(403).json({message : 'No estás autenticado'})
  })
}

export default authenticated(async function handler(req, res) {
        const [rows]=await pool.query("SELECT * FROM proyectointegrado.Categorias where tipoCategoria='secundaria';")
        return res.status(200).json(rows)
  
})