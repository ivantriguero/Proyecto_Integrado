import {pool} from '../../../config/bd'

export default async function handler(req, res){
    const {cantidad, idProyecto, idUsuario, fecha}=req.body
    if (req.method === "POST") {
        await pool.query("INSERT INTO `proyectointegrado`.`Donacion` (`idProyecto`, `idDonante`, `cantidadDonacion`, `fechaDonacion`) VALUES ('"+idProyecto+"', '"+idUsuario+"', '"+cantidad+"', '"+fecha+"');");
        await pool.query("UPDATE `proyectointegrado`.`Proyecto` SET `dineroProyecto` = dineroProyecto+"+cantidad+" WHERE (`idProyecto` = '"+idProyecto+"');")
        return res.status(200).json({message: 'ole ole'})
    }
}