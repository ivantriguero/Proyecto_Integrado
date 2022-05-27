import {pool} from '../../../../config/bd'
import { serverRuntimeConfig } from '../../../../next.config'
import jwt from 'jsonwebtoken'
import { authenticated } from '../../../../config/auth'

export default authenticated(async function handler(req, res) {
    const id=req.query.id
    const [rows]=await pool.query("SELECT * from Proyecto where idONG="+id+";")
    return res.status(200).json(rows)


})