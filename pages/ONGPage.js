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
import jwt from 'jsonwebtoken'
import axios from "axios"

const ONGPage = (proyectos) => {

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

    console.log(proyectos)

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

            <Modal showModal={showModalCrear} className="w-2/5" setShowModal={setShowModalCrear}>
                <div className="py-10 px-10 w-full">
                    <h1 className="text-center">Crear nuevo Proyecto</h1>
                    <form onSubmit={handleSubmit} id="formEditar" className="flex flex-col">
                        <label className="">Título proyecto:</label>
                        <input type="text" required onChange={handleChange} name="titulo" className="py-2 px-2 bg-gray-300 rounded-lg"/>
                        <label className="mt-3">Descripción:</label>
                        <textarea style={{resize:'none'}} rows="4" type="text" onChange={handleChange} name="descripcion" className="py-2 px-2 bg-gray-300 rounded-lg"/>
                        <label className="mt-3">Fecha Límite:</label>
                        <input type="date" required onChange={handleChange} name="fechaLimite" className="py-2 px-2 bg-gray-300 rounded-lg"/>
                        {mostrarAvisoFecha?<span className="text-red-500">!La fecha no puede ser antes del día de hoy!</span>:null}
                        <button type="submit" className="bg-green-500 mt-5 px-5 py-3 rounded-lg hover:bg-green-600">Crear proyecto</button>
                    </form>
                </div>
            </Modal>

            <Modal id="modalEliminar" showModal={showModalEliminar} setShowModal={setShowModalEliminar}>
                <div className="py-10 px-10">
                    <h1 className="text-center border-b-2">Eliminar usuario</h1>
                    <p className="py-5">¿Está seguro de que quiere eliminar el registro?</p>
                    <form className="flex flex-col" onSubmit={handleSubmitEliminar}>
                        <input type="hidden" name="id" value={formValue.id}/>
                        <button type="submit" className="bg-red-500 mt-5 px-5 py-3 rounded-lg hover:bg-red-700">Eliminar</button>
                        <button type="submit" onClick={openModalEliminar} className="bg-gray-500 mt-5 px-5 py-3 rounded-lg hover:bg-gray-600">Cancelar</button>
                    </form>
                </div>
            </Modal>

            <Modal id="modalEditar" showModal={showModalEditar} className="w-2/5" setShowModal={setShowModalEditar}>
                <div className="py-10 px-10 w-full">
                    <h1 className="text-center">Crear nuevo Proyecto</h1>
                    <form onSubmit={handleSubmitEditar} id="formEditar" className="flex flex-col">
                        <label className="">Título proyecto:</label>
                        <input type="text" required onChange={handleChange} value={formValue.titulo} name="titulo" className="py-2 px-2 bg-gray-300 rounded-lg"/>
                        <label className="mt-3">Descripción:</label>
                        <textarea style={{resize:'none'}} rows="4" type="text" value={formValue.descripcion} onChange={handleChange} name="descripcion" className="py-2 px-2 bg-gray-300 rounded-lg"/>
                        <div className="columns-2">
                            <div>
                                <label className="mt-3">Fecha Límite:</label>
                                <input type="date" required onChange={handleChange} value={formValue.fechaLimite} name="fechaLimite" className="w-full py-2 px-2 bg-gray-300 rounded-lg"/>
                            </div>
                            <div>
                            <label className="mt-3">Fecha Creación:</label>
                        <input type="date" required onChange={handleChange} value={formValue.fecha} name="fecha" className="w-full py-2 px-2 bg-gray-300 rounded-lg"/>
                            </div>
                        </div>
                        {mostrarAvisoFecha?<span className="text-red-500">!La fecha límite no puede ser antes del día de creación!</span>:null}
                        <button type="submit" className="bg-green-500 mt-5 px-5 py-3 rounded-lg hover:bg-green-600">Editar proyecto</button>
                    </form>
                </div>
            </Modal>

            <nav className="px-10 py-5 shadow-lg bg-white sticky z-20 top-0 left-0 right-0 text-gray-700 grid grid-cols-3">
                <div className="flex justify-start items-center">
                    <Link href="/"><button><FaLeaf  className="text-3xl text-green-700"/></button></Link>
                </div>
                <div className="flex justify-center">
                    <button onClick={openModalCrear} className="bg-green-600 text-white px-5 py-2 hover:bg-green-700">Crear Proyecto</button>                
                </div>
                <div className="flex justify-end">
                    <button className="px-5 py-2 text-gray-700 flex justify-center items-center hover:text-gray-900"><RiLogoutBoxLine className="mr-3 text-xl" />Cerrar sesión</button>
                </div>
            </nav>
            
            <div id="contenido" className="px-10">
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
                            <div>
                                <button onClick={openModalEditar} className="p-2 bg-orange-600 hover:bg-orange-800 text-white rounded-lg mr-3"><BsFillPencilFill /></button>
                                <button onClick={openModalEliminar} className="p-2 bg-red-700 hover:bg-red-900 text-white rounded-lg"><BsTrashFill /></button>
                            </div>
                        </div>
                        <p className="py-5">{proyecto.descripcionProyecto}</p>
                        <div className="flex justify-between">
                            <div>{proyecto.dineroProyecto}</div>
                            <div>{formatDate(proyecto.fechaProyecto)}</div>
                        </div>
                        <button className="w-full bg-green-700 text-white rounded-lg shadow-lg py-2 mt-5 hover:bg-green-900">Ver detalles</button>
                    </div>
                ))}

                </div>
            </div>
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
        var user=jwt.verify(token, serverRuntimeConfig.secret)
        const {data}= await axios.get("http://localhost:3000/api/proyectos/ong/"+user.idUsuario, config)
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

export default ONGPage