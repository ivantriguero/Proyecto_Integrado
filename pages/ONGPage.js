import { useState } from "react"
import { FaLeaf } from "react-icons/fa"
import Link from "next/link"
import AvisoModal from '../components/AvisoModal'
import Modal from '../components/Modal'
import {RiLogoutBoxLine} from 'react-icons/ri'

const ONGPage = () => {
    
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(formValue.fecha>formValue.fechaLimite){
            setmostrarAvisoFecha(true);
        }else{
            const res = await axios.post('/api/crearproyecto', formValue, config)
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

    const [showModalCrear, setShowModalCrear]=useState(false)
    const openModalCrear = () => {
        setShowModalCrear(prev => !prev)
        setmostrarAvisoFecha(false);
    }

    return (
        <>
            <AvisoModal id="modalAviso" mensaje={mensaje.mensaje} showModal={showModalAviso} setShowModal={setShowModalAviso}>
            </AvisoModal>
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
            <div id="contenido">

            </div>
        </>
    )
}

export default ONGPage