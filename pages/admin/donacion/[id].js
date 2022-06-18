import { useRouter } from 'next/router'
import axios from 'axios'
import {BsFillArrowUpCircleFill} from 'react-icons/bs'
import { useState } from 'react'
import Modal from '../../../components/Modal'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken'
import { serverRuntimeConfig } from '../../../next.config'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


const Post = ({proyectos, donaciones,idUsuario}) => {
    const router = useRouter()

    let token = Cookies.get('accessToken')
    if(token==undefined||token==null){
        token=''
    }



    const [formValue, setFormValue] = useState({
        cantidad:50
    });

    const [showModalPagar, setShowModalPagar]=useState(false)
    const openModalCrear = () => {
        setShowModalPagar(prev => !prev)
    }

    const [showModalAviso, setShowModalAviso]=useState(false)
    const openModalAviso = () => {
        setShowModalAviso(prev => !prev)
    }

    const handleChange = (e) =>{
        const {name, value} = e.target
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const formatDatetoSQL = (date) => {
        let d = new Date(date)
        let month=d.getMonth()+1<10?0+(d.getMonth()+1).toString():d.getMonth()+1
        let day=d.getDate()<10?0+(d.getDate()).toString():d.getDate()
        const formatedDate=d.getFullYear()+"-"+month+"-"+day
        return formatedDate
    }

    const formatDate = (date) => {
        let d = new Date(date)
        let month=d.getMonth()+1<10?0+(d.getMonth()+1).toString():d.getMonth()+1
        let day=d.getDate()<10?0+(d.getDate()).toString():d.getDate()
        const formatedDate=day+"-"+month+"-"+d.getFullYear()
        return formatedDate
    }

    return (
        <>

        <motion.div
        initial={{ y: 0-1000}}
        animate={{ y: 0 }}
        transition={{duration: 1 }}
        exit={{ y: 0-10000}}
        className='w-full flex flex-col h-screen bg-gray-100'>
            <Link href="/admin/proyectos"><button className='w-full py-3 bg-green-800 hover:bg-green-900 flex justify-center items-center text-2xl text-white'><BsFillArrowUpCircleFill /></button></Link>
            <div className='flex grow justify-center items-center'>
                    <div style={{height:'500px'}} className='w-1/4'>
                            <h1 className='text-green-700 text-2xl text-center py-5 border-b-2 border-green-700'>Donaciones</h1>
                            <div style={{height:'400px'}} className='overflow-y-scroll'>
                                {donaciones.length>0 &&donaciones[0].idDonacion!=null ?donaciones.map((donacion)=>(
                                   <>
                                    
                                        <div className='px-2 py-3 bg-gray-200 border-b-2 border-green-700'>
                                            <div className='flex justify-between mb-2'>
                                                <span className='w-full'>{donacion.nombreDonante}</span><span className='w-full text-right'>{donacion.cantidadDonacion} $</span>
                                            </div>
                                            <div className='flex justify-between mb-2'>
                                                <span>{formatDate(donacion.fechaDonacion)}</span>
                                            </div>
                                        </div>
                                    
                                    </>
                                )):<>
                                    <span>No existen donaciones</span>
                                </>}
                            </div>
                </div>
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

      try{
        const { id } = context.params
        const { data }= await axios.get('http://localhost:3000/api/proyectos',{
            headers:{
                authorization: token
            },
            params:{
                id: id
            }
        })
        const resDonaciones= await axios.get('http://localhost:3000/api/donaciones',{
            headers:{
                authorization: token
            },
            params:{
                id: id
            }
        })
        var idUsuario=null
        jwt.verify(token, serverRuntimeConfig.secret, async function(err, decoded){
            if(!err && decoded){
                idUsuario =decoded.idUsuario
            }
          })
        const proyectos=data
        const donaciones=resDonaciones.data
        return {
            props: {
                proyectos: proyectos,
                donaciones: donaciones,
                idUsuario: idUsuario
            }
        }
      }catch(error){
        return error
      }

}

export default Post