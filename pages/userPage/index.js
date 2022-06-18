import { useState } from "react"
import { FaLeaf } from "react-icons/fa"
import Link from "next/link"
import $ from "jquery"
import AvisoModal from '../../components/AvisoModal'
import Cookies from 'js-cookie';
import {RiLogoutBoxLine} from 'react-icons/ri'
import { useRouter } from "next/router"
import { serverRuntimeConfig } from '../../next.config'
import axios from "axios"
import { motion } from "framer-motion"

const UserPage = (proyectos) => {
    
    const router = useRouter();
    
    const cerrarSesion = () => {
        Cookies.remove('accessToken')
        refreshData()
    }

    let token = Cookies.get('accessToken')
    if(token==undefined||token==null){
        token=''
    }
    const config = {
        headers:{
            authorization: token
        }
    };
    
    const refreshData = () => {
        router.replace(router.asPath);
    }


    const [buscador, setBuscador]=useState('')

    const handleChangeBuscador = (e) =>{
        const {name, value} = e.target
        setBuscador((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }


    const formatDate = (date) => {
        let d = new Date(date)
        let month=d.getMonth()+1<10?0+(d.getMonth()+1).toString():d.getMonth()+1
        let day=d.getDate()<10?0+(d.getDate()).toString():d.getDate()
        const formatedDate=day+"-"+month+"-"+d.getFullYear()
        return formatedDate
    }

    const formatDatetoSQL = (date) => {
        let d = new Date(date)
        let month=d.getMonth()+1<10?0+(d.getMonth()+1).toString():d.getMonth()+1
        let day=d.getDate()<10?0+(d.getDate()).toString():d.getDate()
        const formatedDate=d.getFullYear()+"-"+month+"-"+day
        return formatedDate
    }

    return (
        <>
            <motion.nav
            key="usernav"
            initial={{ y: 0-1000}}
            animate={{ y: 0 }}
            transition={{duration: 1 }}
            exit={{ y: 0-10000}}
            className="px-10 py-5 shadow-lg bg-white sticky z-20 top-0 left-0 right-0 text-gray-700 grid grid-cols-3">
                <div className="flex justify-start items-center">
                    <Link href="/"><button><FaLeaf  className="text-3xl text-green-700"/></button></Link>
                </div>
                <div className="flex justify-center">
                </div>
                <div className="flex justify-end">
                    <button onClick={cerrarSesion} className="px-5 py-2 text-gray-700 flex justify-center items-center hover:text-gray-900"><RiLogoutBoxLine className="mr-3 text-xl" />Cerrar sesión</button>
                </div>
            </motion.nav>
            
            <motion.div
            key="userpanel"
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration: 1 }}
            exit={{opacity:0}}
            id="contenido" className="px-10">
                <div id="buscador" className="py-5">
                    <input type="text" name="buscador" onChange={handleChangeBuscador} value={buscador.buscador} placeholder="Buscar Proyectos ..." className="w-full border-2 border-gray-300 px-3 py-2 rounded-lg" />
                </div>
                <div className="grid grid-cols-3 gap-5 mt-10">
                    
                {proyectos.proyectos.map((proyecto, index) => (
                     buscador.buscador == '' || buscador.buscador == null || buscador.buscador == undefined || (proyecto.tituloProyecto.toLowerCase()).includes(buscador.buscador.toLowerCase())?
                    <div className="rounded-lg shadow-2xl p-10 hover:bg-gray-200">
                        <input type="hidden" value={proyecto.idProyecto}></input>
                        <div className="border-b-2 border-green-700 flex justify-between py-3">
                            <h1 className="text-gray-600 text-2xl">{proyecto.tituloProyecto}</h1>
                        </div>
                        <p className="py-5">{proyecto.descripcionProyecto}</p>
                        <div className="flex justify-between">
                            <div>{proyecto.dineroProyecto}</div>
                            <div>{formatDate(proyecto.fechaProyecto)}</div>
                        </div>
                        <Link href={"userPage/proyecto/"+proyecto.idProyecto}><button className="w-full bg-green-700 text-white rounded-lg shadow-lg py-2 mt-5 hover:bg-green-900">Ver detalles</button></Link>
                    </div>:null
                ))}

                </div>
            </motion.div>
        </>
    )
    
}

export const getServerSideProps =async context =>{
    let token = context.req.cookies['accessToken']
    if(token==undefined||token==null){
        token=''
    }
    const config = {
        headers:{
            authorization: token
        }
      };
      try{
        const {data}= await axios.get('http://localhost:3000/api/proyectos', config)
        const proyectos=data
        return {
            props: {
                proyectos: proyectos
            }
        }
      }catch(error){
        if(error.response.status==403){
            return {
                redirect: {
                  permanent: false,
                  destination: "/",
                },
                props:{},
              };
        }
      }

}

export default UserPage