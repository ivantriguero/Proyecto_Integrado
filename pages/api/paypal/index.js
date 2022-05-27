import {pool} from '../../../config/bd'
import { serverRuntimeConfig } from '../../../next.config'
import jwt from 'jsonwebtoken'

export default async function handler(req, res){
    
    console.log(req)
    return res.status(200).json({message: 'PayPal!'})
    
}

