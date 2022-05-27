import { serverRuntimeConfig } from '../next.config'
import jwt from 'jsonwebtoken'

export const authenticated = (fn) => async (
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

