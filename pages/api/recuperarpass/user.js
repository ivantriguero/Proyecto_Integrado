import {pool} from '../../../config/bd'
import { serverRuntimeConfig } from '../../../next.config'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
      const {token}= req.body
      const [rows]=await pool.query("SELECT * FROM proyectointegrado.Usuario where token='"+token+"';")
      return res.status(200).json(rows)
}