import AdminTemplate from "./Admintemplate"
import {AiFillEdit, AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'
import {MdOutlineAttachMoney} from 'react-icons/md'
import Link from "next/link"
import {FiDelete} from 'react-icons/fi'
import Modal from '../../components/Modal'
import AvisoModal from '../../components/AvisoModal'
import { useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import $ from "jquery"
import Cookies from 'js-cookie';
import { motion } from "framer-motion"


const Proyectos =({proyectos, rows}) => {

    const [mostrarAvisoFecha, setmostrarAvisoFecha]=useState(false)

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

    const [mensaje, setMensaje] = useState({
        mensaje: ''
    })

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

    const [showModalCrear, setShowModalCrear]=useState(false)
    const openModalCrear = () => {
        setShowModalCrear(prev => !prev)
        setmostrarAvisoFecha(false);
    }

    const [showModalEditar, setShowModalEditar]=useState(false)
    const openModalEditar = (e) => {
        setShowModalEditar(prev => !prev)
        pasarDatos(e)
        setmostrarAvisoFecha(false);
    }
    
    const [showModalEliminar, setShowModalEliminar]=useState(false)
    const openModalEliminar = (e) => {
        setShowModalEliminar(prev => !prev)
        pasarDatosEliminar(e)
    }

    const [showModalAviso, setShowModalAviso]=useState(false)
    const openModalAviso = (e) => {
        if(showModalAviso){
            setShowModalAviso(prev => prev)
        }else{
            setShowModalAviso(prev => !prev)
        }
    }

    const [showModalDon, setShowModalDon] = useState(false)

    const mostrarDonaciones =async (e) => {
        await pasarDatosEliminar(e)
        let id=formValue.id
        const {data} = await axios.get('http://localhost:3000/api/donaciones',{
            headers:{
                authorization: token
            },
            params:{
                id: formValue.id
            }
        })
        
        setShowModalDon(true)
        setDonaciones(()=>data)
    }

    
    const [donaciones, setDonaciones]= useState([])

    const [showPage, setShowPage]=useState(0)
    
    const nextPage = () => {
        setShowPage((prevState) => {
            return prevState+1
        })
    }

    const prevPage = () => {
        setShowPage((prevState) => {
            return prevState-1
        })
    }

    const crearproyecto = <button onClick={openModalCrear} className="bg-green-600 text-white px-5 py-2 hover:bg-green-700">Añadir proyecto +</button>

    const pasarDatos = (e) => {
        let idProyecto = $(e.currentTarget).parent().siblings().eq(0).attr("id");
        let titulo = $(e.currentTarget).parent().siblings().eq(1).attr("uservalue");
        let descripcion = $(e.currentTarget).parent().siblings().eq(2).attr("uservalue");
        let dinero = $(e.currentTarget).parent().siblings().eq(3).attr("uservalue");
        let fecha = $(e.currentTarget).parent().siblings().eq(4).attr("uservalue");
        let fechaLimite = $(e.currentTarget).parent().siblings().eq(5).attr("uservalue");
        setFormValue(() =>{
            return {
                id: idProyecto,
                titulo: titulo,
                descripcion:descripcion,
                dinero: dinero,
                fecha : fecha,
                fechaLimite : fechaLimite
            }
        })
    }

    const pasarDatosEliminar = async (e) => {
        let idProyecto = $(e.currentTarget).parent().siblings().eq(0).attr("id");
        setFormValue(() =>{
            return {
                id: idProyecto
            }
        })

    }

    return (
        <div className=" w-full">
            <AvisoModal id="modalAviso" mensaje={mensaje.mensaje} showModal={showModalAviso} setShowModal={setShowModalAviso}>
            </AvisoModal>
       
            <AdminTemplate button={crearproyecto} title="Proyectos">

            <Modal id="modalDon" showModal={showModalDon} className="w-2/5" setShowModal={setShowModalDon}>
                    <div className="py-10 px-10 w-full">
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
                            {mostrarAvisoFecha?<span className="text-red-500">!La fecha no puede ser antes del día de hoy!</span>:null}
                            <button type="submit" className="bg-green-500 mt-5 px-5 py-3 rounded-lg hover:bg-green-600">Editar proyecto</button>
                        </form>
                    </div>
                </Modal>
                <motion.div
                    initial={{ x: 1000,opacity:0 }}
                    animate={{ x: 0, opacity:1 }}
                    transition={{duration: 1 }}
                    exit={{ y: 1000,opacity:0 }}
                    className="flex justify-between flex-col w-full h-full px-5">
                    <table className="table-auto shadow-xl">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <td className="px-14 text-center py-3 border-r-2 border-slate-900 rounded-tl-lg">#</td>
                            <td className="px-14 text-center py-3 border-r-2 border-slate-900">Título</td>
                            <td className="px-14 text-center py-3 border-l-2 border-slate-900">Dinero donado</td>
                            <td className="px-14 text-center py-3 border-l-2 border-slate-900">Fecha publicación</td>
                            <td className="px-14 text-center py-3 border-l-2 border-slate-900">Fecha límite</td>
                            <td className="px-14 text-center py-3 border-l-2 border-slate-900 rounded-tr-lg"></td>
                        </tr>
                    </thead>
                    <tbody>
                        {rows[showPage]?.map((proyecto, index) => (
                        <tr id="parent" key={proyecto.idProyecto}>
                            <td id={proyecto.idProyecto} uservalue={proyecto.idProyecto} className="text-center py-3 border-x-2 border-gray">{proyecto.idProyecto}</td>
                            <td uservalue={proyecto.tituloProyecto} className="text-center py-3 border-r-2 border-gray px-2">{proyecto.tituloProyecto}</td>
                            <td uservalue={proyecto.descripcionProyecto} className="hidden">{proyecto.descripcionProyecto}</td>
                            <td uservalue={proyecto.dineroProyecto} className="text-center py-3 border-r-2 border-gray">{proyecto.dineroProyecto} €</td>
                            <td uservalue={formatDatetoSQL(proyecto.fechaProyecto)} className="text-center py-3 border-r-2 border-gray">{formatDate(proyecto.fechaProyecto)}</td>
                            <td uservalue={formatDatetoSQL(proyecto.fechaLimiteProyecto)} className="text-center py-3 border-r-2 border-gray">{formatDate(proyecto.fechaLimiteProyecto)}</td>
                            <td className="text-center py-3 border-r-2 border-gray">
                            <Link href={"donacion/"+proyecto.idProyecto}><button className="bg-green-500 text-white p-1 rounded-lg mr-2 hover:bg-green-600"><MdOutlineAttachMoney /></button></Link>
                                    <button onClick={openModalEditar} className="bg-orange-500 text-white p-1 rounded-lg mr-2 hover:bg-orange-600"><AiFillEdit /></button>
                                    <button onClick={openModalEliminar} className="bg-red-500 text-white p-1 rounded-lg hover:bg-red-600"><FiDelete /></button>
                                </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center mt-5">
                {showPage==0?
                        <button onClick={prevPage} disabled className="opacity-75 text-white bg-slate-800 mr-5 px-4 py-3 rounded-lg"> <AiOutlineArrowLeft /> </button>
                    :   <button onClick={prevPage} className="text-white bg-slate-800 mr-5 px-4 py-3 rounded-lg"> <AiOutlineArrowLeft /> </button>
                }                    {showPage==rows.length-1?
                        <button onClick={nextPage} disabled className="opacity-75 text-white bg-slate-800 mr-5 px-4 py-3 rounded-lg"> <AiOutlineArrowRight /> </button>
                    :   <button onClick={nextPage} className="text-white bg-slate-800 mr-5 px-4 py-3 rounded-lg"> <AiOutlineArrowRight /> </button>
                }
                </div>

                </motion.div>
            </AdminTemplate>
        </div> 
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
          const { data }= await axios.get('http://localhost:3000/api/proyectos', config)
          let rows=[]
          let row=[]
          data.forEach(function(proyecto, index) {
              row.push(proyecto)
              if(row.length==7||index==data.length-1){
                  rows.push(row)
                  row=[]
              }
              
          });
          return {
            props: {
                proyectos: data,
                rows: rows
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

export default Proyectos