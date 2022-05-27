import { useState } from "react"
import { FaLeaf } from "react-icons/fa"
import Link from "next/link"
import $ from "jquery"
import AvisoModal from '../components/AvisoModal'
import Modal from '../components/Modal'
import Cookies from 'js-cookie';
import {RiLogoutBoxLine} from 'react-icons/ri'
import { useRouter } from "next/router"
import { serverRuntimeConfig } from '../next.config'
import {BsTrashFill, BsFillPencilFill} from 'react-icons/bs'
import axios from "axios"
import { motion } from "framer-motion"

const UserPage = (proyectos) => {

    let token = Cookies.get('accessToken')
    if(token==undefined||token==null){
        token=''
    }
    const config = {
        headers:{
            authorization: token
        }
    };
    
    const router = useRouter();
    const refreshData = () => {
        router.replace(router.asPath);
    }

    const formatDate = (date) => {
        let d = new Date(date)
        let month=d.getMonth()+1<10?0+(d.getMonth()+1).toString():d.getMonth()+1
        let day=d.getDate()<10?0+(d.getDate()).toString():d.getDate()
        const formatedDate=day+"-"+month+"-"+d.getFullYear()
        return formatedDate
    }

    const handleSubmitEditar = async (e) => {
        e.preventDefault()
        if(formValue.fecha>formValue.fechaLimite){
            setmostrarAvisoFecha(true);
        }else{
            const res = await axios.put('/api/proyectos', formValue, config)
            if(res.status==200){
                setMensaje(()=>{
                    return{
                        mensaje: 'Proyecto editada correctamente'
                    }
                })
                openModalAviso()
            }else{
    
            }
            setmostrarAvisoFecha(false);
            refreshData()
        }
        console.log(formValue)
    }

    const formatDatetoSQL = (date) => {
        let d = new Date(date)
        let month=d.getMonth()+1<10?0+(d.getMonth()+1).toString():d.getMonth()+1
        let day=d.getDate()<10?0+(d.getDate()).toString():d.getDate()
        const formatedDate=d.getFullYear()+"-"+month+"-"+day
        return formatedDate
    }

    const [showModalAviso, setShowModalAviso]=useState(false)

    const [mostrarAvisoFecha, setmostrarAvisoFecha]=useState(false)

    const openModalAviso = (e) => {
        if(showModalAviso){
            setShowModalAviso(prev => prev)
        }else{
            setShowModalAviso(prev => !prev)
        }
    }

    const [mensaje, setMensaje] = useState({
        mensaje: ''
    })

    const [formValue, setFormValue] = useState({
        titulo : '',
        descripcion : '',
        dinero: '0',
        fecha: formatDatetoSQL(new Date(Date.now())),
        fechaLimite:'',
    });



    const handleChange = (e) =>{
        const {name, value} = e.target
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleSubmitEliminar = async (e) => {
        e.preventDefault()
        const id=formValue.id
        const res = await axios.delete('/api/proyectos', {
            headers:{
                authorization: token
            },
            data:{
                id: id
            },
            
        })
        if(res.status==200){
            setMensaje(()=>{
                return{
                    mensaje: 'Proyecto eliminado correctamente'
                }
            })
            if(showModalAviso){
                setShowModalAviso(prev => !prev)
                openModalAviso()
            }else{
                openModalAviso()
            }
        }else{

        }
        refreshData()
        setShowModalEliminar(prev => !prev)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(formValue.fecha>formValue.fechaLimite){
            setmostrarAvisoFecha(true);
        }else{
            const res = await axios.post('/api/proyectos', formValue, config)
            if(res.status==200){
                setMensaje(()=>{
                    return{
                        mensaje: 'Proyecto creada correctamente'
                    }
                })
                openModalAviso()
            }else{
    
            }
            refreshData()
        }
        console.log(formValue)
    }

    const [showModalEliminar, setShowModalEliminar]=useState(false)
    const openModalEliminar = (e) => {
        setShowModalEliminar(prev => !prev)
        getDatos(e)
    }

    const [showModalCrear, setShowModalCrear]=useState(false)
    const openModalCrear = () => {
        setShowModalCrear(prev => !prev)
        setmostrarAvisoFecha(false);
    }

    const [showModalEditar, setShowModalEditar]=useState(false)
    const openModalEditar = (e) => {
        setShowModalEditar(prev => !prev)
        getDatos(e)
        setmostrarAvisoFecha(false);
    }

    const getDatos = async (e) => {
        let idProyecto = $(e.currentTarget).parent().parent().siblings().eq(0).attr("value");
        console.log(token)
        const { data }= await axios.get('http://localhost:3000/api/proyectos',{
            headers:{
                authorization: token
            },
            params:{
                id: idProyecto
            }
        })
        setFormValue(() =>{
            return {
                id: data.idProyecto,
                titulo: data.tituloProyecto,
                descripcion:data.descripcionProyecto,
                dinero: data.dineroProyecto,
                fecha : formatDatetoSQL(data.fechaProyecto),
                fechaLimite : formatDatetoSQL(data.fechaLimiteProyecto)
            }
        })
        console.log(data)
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
                    <button className="px-5 py-2 text-gray-700 flex justify-center items-center hover:text-gray-900"><RiLogoutBoxLine className="mr-3 text-xl" />Cerrar sesión</button>
                </div>
            </motion.nav>
            
            <motion.div
            key="userpanel"
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration: 1 }}
            exit={{opacity:0}}
            id="contenido" className="px-10">
                <AvisoModal id="modalAviso" mensaje={mensaje.mensaje} showModal={showModalAviso} setShowModal={setShowModalAviso}>
                </AvisoModal>
                <div id="buscador" className="py-5">
                    <input type="text" placeholder="Buscar Proyectos ..." className="w-full border-2 border-gray-300 px-3 py-2 rounded-lg" />
                </div>
                <div className="grid grid-cols-3 gap-5 mt-10">
                    
                {proyectos.proyectos.map((proyecto, index) => (
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
                        <Link href={"proyecto/"+proyecto.idProyecto}><button className="w-full bg-green-700 text-white rounded-lg shadow-lg py-2 mt-5 hover:bg-green-900">Ver detalles</button></Link>
                    </div>
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