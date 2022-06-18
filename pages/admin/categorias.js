import AdminTemplate from "./Admintemplate"
import {AiFillEdit, AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'
import {FiDelete} from 'react-icons/fi'
import Modal from '../../components/Modal'
import AvisoModal from '../../components/AvisoModal'
import React from "react"
import { useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import $ from "jquery"
import Cookies from 'js-cookie';
import { motion } from "framer-motion"


const Categorias =({categorias, rows, rowsS}) => {
    const [tipoMostrar, setTipoMostrar]= useState('principal')

    const mostrarPrincipal = () =>{
        setTipoMostrar('principal')
    }

    const mostrarSecundaria = () =>{
        setTipoMostrar('secundaria')
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
    // Call this function whenever you want to
    // refresh props!
    const refreshData = () => {
        router.replace(router.asPath);
    }
    const [formValue, setFormValue] = useState({
        titulo : '',
        descripcion : '',
        dinero: '0',
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
            const res = await axios.post('/api/categorias', formValue, config)
            if(res.status==200){
                setMensaje(()=>{
                    return{
                        mensaje: 'Categoria creada correctamente'
                    }
                })
                openModalAviso()
            }else{
    
            }
            refreshData()
    }
    
    const handleSubmitEditar = async (e) => {
        e.preventDefault()
            const res = await axios.put('/api/categorias', formValue, config)
            if(res.status==200){
                setMensaje(()=>{
                    return{
                        mensaje: 'Categoria editada correctamente'
                    }
                })
                openModalAviso()
            }else{
    
            }
            setmostrarAvisoFecha(false);
            refreshData()
    }

    const handleSubmitEliminar = async (e) => {
        e.preventDefault()
        const id=formValue.id
        const res = await axios.delete('/api/categorias', {
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
                    mensaje: 'Categoria eliminado correctamente'
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

    }

    const [showModalEditar, setShowModalEditar]=useState(false)
    const openModalEditar = (e) => {
        setShowModalEditar(prev => !prev)
        pasarDatos(e)

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

    const crearcategoria = <button onClick={openModalCrear} className="bg-green-600 text-white px-5 py-2 hover:bg-green-700">Añadir categoria +</button>

    const pasarDatos = (e) => {
        let idCategoria = $(e.currentTarget).parent().siblings().eq(0).attr("id");
        let titulo = $(e.currentTarget).parent().siblings().eq(1).attr("uservalue");
        let descripcion = $(e.currentTarget).parent().siblings().eq(2).attr("uservalue");
        let dinero = $(e.currentTarget).parent().siblings().eq(3).attr("uservalue");
        let fecha = $(e.currentTarget).parent().siblings().eq(4).attr("uservalue");
        let fechaLimite = $(e.currentTarget).parent().siblings().eq(5).attr("uservalue");
        setFormValue(() =>{
            return {
                id: idcategoria,
                titulo: titulo,
                descripcion:descripcion,
                dinero: dinero,
                fecha : fecha,
                fechaLimite : fechaLimite
            }
        })
    }

    const pasarDatosEliminar = (e) => {
        let idcategoria = $(e.currentTarget).parent().siblings().eq(0).attr("id");
        setFormValue(() =>{
            return {
                id: idcategoria
            }
        })

    }

    return (
        <div className=" w-full">
            <AvisoModal id="modalAviso" mensaje={mensaje.mensaje} showModal={showModalAviso} setShowModal={setShowModalAviso}>
            </AvisoModal>
       
            <AdminTemplate button={crearcategoria} title="Categorias">

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
                        <h1 className="text-center">Crear nuevo Categoria</h1>
                        <form onSubmit={handleSubmit} id="formEditar" className="flex flex-col">
                            <label className="">Título categoria:</label>
                            <input type="text" required onChange={handleChange} name="titulo" className="py-2 px-2 bg-gray-300 rounded-lg"/>
                            <label className="mt-3">Descripción:</label>
                            <textarea style={{resize:'none'}} rows="4" type="text" onChange={handleChange} name="descripcion" className="py-2 px-2 bg-gray-300 rounded-lg"/>
                            <label className="mt-3">Fecha Límite:</label>
                            <input type="date" required onChange={handleChange} name="fechaLimite" className="py-2 px-2 bg-gray-300 rounded-lg"/>
                            <button type="submit" className="bg-green-500 mt-5 px-5 py-3 rounded-lg hover:bg-green-600">Crear categoria</button>
                        </form>
                    </div>
                </Modal>

                <Modal id="modalEditar" showModal={showModalEditar} className="w-2/5" setShowModal={setShowModalEditar}>
                <div className="py-10 px-10 w-full">
                        <h1 className="text-center">Crear nuevo Categoria</h1>
                        <form onSubmit={handleSubmitEditar} id="formEditar" className="flex flex-col">
                            <label className="">Título categoria:</label>
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
                            <button type="submit" className="bg-green-500 mt-5 px-5 py-3 rounded-lg hover:bg-green-600">Editar categoria</button>
                        </form>
                    </div>
                </Modal>
                <motion.div
                    initial={{ x: 1000,opacity:0 }}
                    animate={{ x: 0, opacity:1 }}
                    transition={{duration: 1 }}
                    exit={{ y: 1000,opacity:0 }}
                    className="flex justify-between flex-col w-full h-full px-5">
                    <div>
                        <div className="ml-3">
                            {tipoMostrar=='principal'?
                            <>
                                <button className="bg-slate-800 px-5 py-2 rounded-tl-lg rounded-tr-lg text-white">Categorías principales</button>
                                <button onClick={mostrarSecundaria} className="bg-slate-600 hover:bg-slate-700 px-5 py-2 rounded-tl-lg rounded-tr-lg text-white">Categorías secundarias</button>
                            </>
                            :
                            <>
                                <button onClick={mostrarPrincipal} className="bg-slate-600 hover:bg-slate-700 px-5 py-2 rounded-tl-lg rounded-tr-lg text-white">Categorías principales</button>
                                <button className="bg-slate-800 px-5 py-2 rounded-tl-lg rounded-tr-lg text-white">Categorías secundarias</button>
                            </>
                            }

                        </div>
                        <div className="max-h-96 overflow-y-scroll overflow-x-hidden">
                        <table className="table-auto shadow-xl w-full">
                            <thead className="bg-slate-800 text-white h-14 sticky top-0">
                                <tr>
                                    <td className="px-14 text-center py-3 border-r-2 border-slate-900 rounded-tl-lg">#</td>
                                    <td className="px-14 text-center py-3 border-r-2 border-slate-900">Título</td>
                                    <td className="px-14 text-center py-3 border-l-2 border-slate-900">Nombre categoría</td>
                                    <td className="px-14 text-center py-3 border-l-2 border-slate-900 rounded-tr-lg">Tipo categoría</td>
                                </tr>
                            </thead>
                            {tipoMostrar=='principal' ? 
                            <tbody className="max-h-80">
                                {rows[showPage]?.map((categoria, index) => (
                                <React.Fragment key={categoria.idCategoria}>
                                    <tr id="parent" key={categoria.idCategoria}>
                                        <td id={categoria.idCategoria} uservalue={categoria.idCategoria} className="text-center py-3 border-x-2 border-gray">{categoria.idCategoria}</td>
                                        <td uservalue={categoria.nombreCategoria} className="text-center py-3 border-r-2 border-gray px-2">{categoria.nombreCategoria}</td>
                                        <td uservalue={categoria.descripcionCategoria} className="hidden">{categoria.descripcionCategoria}</td>
                                        <td uservalue={categoria.tipoCategoria} className="text-center py-3 border-r-2 border-gray px-2">{categoria.tipoCategoria}</td>
                                        <td className="text-center py-3 border-r-2 border-gray">
                                            <button onClick={openModalEditar} className="bg-orange-500 text-white p-2 rounded-lg mr-2 hover:bg-orange-600"><AiFillEdit /></button>
                                            <button onClick={openModalEliminar} className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"><FiDelete /></button>
                                        </td>
                                    </tr>
                                    {categoria.subCategorias.length!=0?
                                    categoria.subCategorias.map((subCategoria) =>(
                                        <tr key={subCategoria.idCategoria} className="bg-gray-300">
                                        <td id={subCategoria.idCategoria} uservalue={subCategoria.idCategoria} className="text-center py-2 border-l-2 border-gray">{subCategoria.idCategoria}</td>
                                        <td uservalue={subCategoria.nombreCategoria} className="text-center py-2 px-2">{subCategoria.nombreCategoria}</td>
                                        <td uservalue={subCategoria.descripcionCategoria} className="hidden">{subCategoria.descripcionCategoria}</td>
                                        <td uservalue={subCategoria.tipoCategoria} className="text-center py-2 px-2">{subCategoria.tipoCategoria}</td>
                                        <td className="text-center py-2">
                                            <button onClick={openModalEditar} className="bg-orange-500 text-white p-2 rounded-lg mr-2 hover:bg-orange-600"><AiFillEdit /></button>
                                            <button onClick={openModalEliminar} className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"><FiDelete /></button>
                                        </td>
                                        </tr>
                                    ))
                                    :null}
                                </React.Fragment>
                                ))}
                            </tbody>
                            :
                            <tbody>
                                {rowsS[showPage]?.map((categoria, index) => (
                                <tr id="parent" key={categoria.idCategoria}>
                                    <td id={categoria.idCategoria} uservalue={categoria.idCategoria} className="text-center py-3 border-x-2 border-gray">{categoria.idCategoria}</td>
                                    <td uservalue={categoria.nombreCategoria} className="text-center py-3 border-r-2 border-gray px-2">{categoria.nombreCategoria}</td>
                                    <td uservalue={categoria.descripcionCategoria} className="hidden">{categoria.descripcionCategoria}</td>
                                    <td uservalue={categoria.tipoCategoria} className="text-center py-3 border-r-2 border-gray px-2">{categoria.tipoCategoria}</td>
                                    <td className="text-center py-3 border-r-2 border-gray">
                                        <button onClick={openModalEditar} className="bg-orange-500 text-white p-2 rounded-lg mr-2 hover:bg-orange-600"><AiFillEdit /></button>
                                        <button onClick={openModalEliminar} className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"><FiDelete /></button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                            }
                        </table>
                        </div>
                    </div>
                    
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
          const res= await axios.get('http://localhost:3000/api/categorias/principal', config)
          const data=await res.data
          let rows=[]
          let row=[]
          await data.forEach(async function(categoria, index) {
                const resSubCat= await axios.get('http://localhost:3000/api/categorias/subcategorias',{
                    headers:{
                        authorization: token
                    },
                    data:{
                        id: categoria.idCategoria
                    },
                    
                })
                 let dataSubCat=await resSubCat.data
                  const categoriai={
                      ...categoria,
                      subCategorias:dataSubCat
                  }
                  row.push(categoriai)
              if(row.length==7||index==data.length-1){
                  rows.push(row)
                  row=[]
              }
              
          });

          const resS= await axios.get('http://localhost:3000/api/categorias/secundaria', config)
          const dataS=resS.data
          let rowsS=[]
          let rowSec=[]
          dataS.forEach(function(categoria, index) {
              rowSec.push(categoria)
              if(rowSec.length==7||index==dataS.length-1){
                  rowsS.push(rowSec)
                  rowSec=[]
              }
              
          });


          return {
            props: {
                categorias: data,
                rows: rows,
                rowsS: rowsS
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

export default Categorias