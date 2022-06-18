import {pool} from '../../../config/bd'
import { serverRuntimeConfig } from '../../../next.config'
import jwt from 'jsonwebtoken'
import multer from 'multer'

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

export default async function handler(req, res) {
    const foto=req.body.foto
    const storage = multer.diskStorage({
        destination: function (req, foto, cb) {
          cb(null, '/public/imgs/proyectos')
        },
        filename: function (req, foto, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          cb(null, foto.fieldname + '-' + uniqueSuffix)
        }
      })
      
      const upload = multer({ storage: storage })

    return res.status(200).json("Hecho!")

}