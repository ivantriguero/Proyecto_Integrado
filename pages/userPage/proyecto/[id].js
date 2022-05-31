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
        <Modal showModal={showModalAviso} setShowModal={setShowModalAviso} className="w-3/4 overflow-y-scroll h-3/4">
            <div>
                <h1 className='text-4xl text-green-700 py-5 px-3'>Donación realizada correctamente</h1>
            </div>
        </Modal>
        <Modal showModal={showModalPagar} setShowModal={setShowModalPagar} className="w-3/4 overflow-y-scroll h-3/4">
            <div className="py-10 w-3/4">
                <h1 className="text-center text-2xl mb-10 text-gray-800">Selecciona la cantidad</h1>
                    <input onChange={handleChange} className="w-full" name="cantidad" type="range" min="0" max="100"></input>
                    <div className='flex justify-center'>
                        <input onChange={handleChange} className="w-10 border-2 border-gray-800 text-center" type="number" name="cantidad" value={formValue.cantidad}/>
                    </div>
                    <div className="text-center mt-5">
                        <PayPalScriptProvider options={{ "client-id": "ATbp7wMUFboTry_dipCAFlbyEOwed48AyWpd6bGjOWM_uLRc3qccy__lSYMvMNjqqx9CZ8v_C3hdCQCA" }}>
                            <PayPalButtons forceReRender={[formValue]} createOrder={async () =>{
                                try{
                                    const res = await axios.post('/api/pagos', {
                                        cantidad:formValue.cantidad,
                                        idUsuario: idUsuario,
                                        idProyecto: proyectos.idProyecto,
                                        fecha: formatDatetoSQL(new Date())
                                    })
                                    return res.data.id
                                }catch(error){
                                    console.log(error)
                                }
                            }} 
                            onCancel={data => console.log("Compra cancelada")}
                            onApprove={async (data, actions)=>{
                                console.log(data)
                                await axios.post('/api/pagos/success', {
                                    cantidad:formValue.cantidad,
                                    idUsuario: idUsuario,
                                    idProyecto: proyectos.idProyecto,
                                    fecha: formatDatetoSQL(new Date())
                                })
                                openModalAviso()
                                actions.order.capture()
                            }}
                            style={{ layout: "vertical", color: "blue" }} />
                        </PayPalScriptProvider>

                    </div>
            </div>
        </Modal>
        <motion.div
        initial={{ y: 0-1000}}
        animate={{ y: 0 }}
        transition={{duration: 1 }}
        exit={{ y: 0-10000}}
        className='w-full flex flex-col h-screen bg-gray-100'>
            <Link href="/userPage"><button className='w-full py-3 bg-green-800 hover:bg-green-900 flex justify-center items-center text-2xl text-white'><BsFillArrowUpCircleFill /></button></Link>
            <div className='flex grow justify-center items-center'>
                <div style={{height:'500px'}} className='w-4/5 bg-white rounded-lg shadow-xl pl-10 flex'>
                    <div className='w-3/4'>
                        <h1 className='text-4xl pt-10 pb-5 text-gray-700 border-b-4 border-green-800'>{proyectos.tituloProyecto}</h1>
                        <p className='text-xl py-5 my-5 px-5 border-2 border-gray-100'>{proyectos.descripcionProyecto}</p>
                        <div className='pt-10 pb-5'>
                            <span className='text-lg text-green-800'>Dinero donado:</span> {proyectos.dineroProyecto} €
                            <button onClick={openModalCrear} className="py-5 bg-green-800 text-white w-full hover:bg-green-900 rounded-lg text-2xl text-center mt-10">Donar</button>
                        </div>
                        <div className='pt-10 pb-5'>
                            <span className='mr-20'>Fecha inicial: {formatDate(proyectos.fechaProyecto)}</span><span>Fecha final: {formatDate(proyectos.fechaLimiteProyecto)}</span>
                        </div>
                    </div>
                    <div style={{height:'500px'}} className='w-1/4'>
                            <h1 className='text-green-700 text-2xl text-center py-5 border-b-2 border-green-700'>Donaciones</h1>
                            <div style={{height:'400px'}} className='overflow-y-scroll'>
                                {donaciones.idDonacione!=null ?donaciones.map((donacion)=>(
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
                console.log(decoded.idUsuario)
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