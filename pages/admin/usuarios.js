import AdminTemplate from "./Admintemplate"
import {AiFillEdit} from 'react-icons/ai'
import {FiDelete} from 'react-icons/fi'
import Modal from '../../components/Modal'
import { useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import $ from "jquery"

const Usuarios =({usuarios}) => {

    const router = useRouter();
    // Call this function whenever you want to
    // refresh props!
    const refreshData = () => {
      router.replace(router.asPath);
    }
    const [formValue, setFormValue] = useState({
        email : '',
        clave : '',
        nombre: '',
        dni:'',
        telefono:''
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
        const {email, clave, nombre, dni, telefono}=formValue
        const res = await axios.post('/api/usuarios', {
            email:[email],
            clave: [clave],
            nombre: [nombre],
            dni: [dni],
            telefono: [telefono]
        })
        refreshData()
    }

    const handleSubmitEditar = async (e) => {
        e.preventDefault()
        console.log(formValue)
        const {id, email, clave, nombre, dni, telefono}=formValue
        const res = await axios.put('/api/usuarios', {
            id: [id],
            email:[email],
            clave: [clave],
            nombre: [nombre],
            dni: [dni],
            telefono: [telefono]
        })
        refreshData()
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

    const crearUsuario = <button onClick={openModalCrear} className="bg-green-600 text-white px-5 py-2 hover:bg-green-700">Añadir usuario +</button>

    const pasarDatos = (e) => {
        let idUsuario = $(e.currentTarget).parent().siblings().eq(0).attr("id");
        let emailUsuario = $(e.currentTarget).parent().siblings().eq(1).attr("uservalue");
        let nombreUsuario = $(e.currentTarget).parent().siblings().eq(2).attr("uservalue");
        let dniUsuario = $(e.currentTarget).parent().siblings().eq(3).attr("uservalue");
        let telefonoUsuario = $(e.currentTarget).parent().siblings().eq(4).attr("uservalue");
        //console.log(idUsuario,emailUsuario,nombreUsuario,dniUsuario,telefonoUsuario)
        setFormValue(() =>{
            return {
                id: idUsuario,
                email : emailUsuario,
                clave : '',
                nombre: nombreUsuario,
                dni:dniUsuario,
                telefono:telefonoUsuario
            }
        })

    }

    return (
        <AdminTemplate button={crearUsuario}>
            
            <Modal showModal={showModalCrear} setShowModal={setShowModalCrear}>
                <div className="py-10 px-10">
                    <h1 className="text-center">Crear nuevo usuario</h1>
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <label className="py-2">Email:</label>
                        <input type="email" onChange={handleChange} name="email" className="py-2 px-2 bg-gray-300 rounded-lg"/>
                        <label className="py-2">Contraseña:</label>
                        <input type="password" onChange={handleChange} name="clave" className="py-2 px-2 bg-gray-300 rounded-lg"/>
                        <div className="columns-2">
                            <div>
                                <label className="py-2">Nombre:</label><br />
                                <input type="text" onChange={handleChange} name="nombre" className="py-2 px-2 bg-gray-300 rounded-lg"/>
                            </div>
                            <div>
                                <label className="py-2">DNI:</label><br />
                                <input type="text" onChange={handleChange} name="dni" className="py-2 px-2 bg-gray-300 rounded-lg"/>
                            </div>
                        </div>
                        <label className="py-2">Teléfono:</label>
                        <input type="text" onChange={handleChange} name="telefono" className="py-2 px-2 bg-gray-300 rounded-lg"/>
                        <button type="submit" className="bg-green-500 mt-5 px-5 py-3 rounded-lg hover:bg-green-600">Crear Usuario</button>
                    </form>
                </div>
            </Modal>

            <Modal id="modalEditar" showModal={showModalEditar} setShowModal={setShowModalEditar}>
            <div className="py-10 px-10">
                    <h1 className="text-center">Editar usuario</h1>
                    <form onSubmit={handleSubmitEditar} id="formEditar" className="flex flex-col">
                        <label className="py-2">Email:</label>
                        <input id="editaremail" type="email" onChange={handleChange} value={formValue.email} name="email" className="py-2 px-2 bg-gray-300 rounded-lg"/>
                        <label className="py-2">Nueva Contraseña:</label>
                        <input type="password" onChange={handleChange} value={formValue.clave} name="clave" className="py-2 px-2 bg-gray-300 rounded-lg"/>
                        <div className="columns-2">
                            <div>
                                <label className="py-2">Nombre:</label><br />
                                <input id="editarnombre" type="text" onChange={handleChange} value={formValue.nombre} name="nombre" className="py-2 px-2 bg-gray-300 rounded-lg"/>
                            </div>
                            <div>
                                <label className="py-2">DNI:</label><br />
                                <input  id="editardni" type="text" onChange={handleChange} value={formValue.dni} name="dni" className="py-2 px-2 bg-gray-300 rounded-lg"/>
                            </div>
                        </div>
                        <label className="py-2">Teléfono:</label>
                        <input id="editartelefono" type="text" onChange={handleChange} value={formValue.telefono} name="telefono" className="py-2 px-2 bg-gray-300 rounded-lg"/>
                        <button type="submit" className="bg-green-500 mt-5 px-5 py-3 rounded-lg hover:bg-green-600">Editar Usuario</button>
                    </form>
                </div>
            </Modal>
            <table className="table-auto shadow-xl">
               <thead className="bg-slate-800 text-white">
                   <tr>
                       <td className="px-14 py-3 border-r-2 border-slate-900 rounded-tl-lg">#</td>
                       <td className="px-14 py-3 border-r-2 border-slate-900">emailUsuario</td>
                       <td className="px-14 py-3 border-r-2 border-slate-900">Nombre</td>
                       <td className="px-14 py-3 border-r-2 border-slate-900">DNI</td>
                       <td className="px-14 py-3 border-l-2 border-slate-900">Teléfono</td>
                       <td className="px-14 py-3 border-l-2 border-slate-900 rounded-tr-lg"></td>
                   </tr>
               </thead>
               <tbody>
                {usuarios.map(usuario => (
                   <tr id="parent" key={usuario.idUsuario}>
                       <td id={usuario.idUsuario} uservalue={usuario.idUsuario} className="text-center py-3 border-x-2 border-gray">{usuario.idUsuario}</td>
                       <td uservalue={usuario.emailUsuario} className="text-center py-3 border-r-2 border-gray px-2">{usuario.emailUsuario}</td>
                       <td uservalue={usuario.nombreDonante} className="text-center py-3 border-r-2 border-gray px-2">{usuario.nombreDonante}</td>
                       <td uservalue={usuario.dniDonante} className="text-center py-3 border-r-2 border-gray">{usuario.dniDonante}</td>
                       <td uservalue={usuario.telefonoDonante} className="text-center py-3 border-r-2 border-gray">{usuario.telefonoDonante}</td>
                       <td className="text-center py-3 border-r-2 border-gray">
                            <button onClick={openModalEditar} className="bg-orange-500 text-white p-2 rounded-lg mr-2 hover:bg-orange-600"><AiFillEdit /></button>
                            <button className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"><FiDelete /></button>
                        </td>
                   </tr>
                ))}
               </tbody>
           </table>
        </AdminTemplate>
    )
    
}

export const getServerSideProps =async context =>{
    const { data }= await axios.get('http://localhost:3000/api/usuarios')
    return {
        props: {
            usuarios: data
        }
    }
}

export default Usuarios