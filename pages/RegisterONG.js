import { motion, AnimatePresence } from "framer-motion"
import {BiArrowToLeft} from 'react-icons/bi'
import {AiFillWarning} from 'react-icons/ai'
import Link from "next/link"
import { useState } from "react"
import axios from "axios"
import jwt from 'jsonwebtoken'
import { serverRuntimeConfig } from '../next.config'
import cookieCutter from 'cookie-cutter'
import { useRouter } from "next/router"

const RegisterONG = ({showLogin, setShowLogin}) => {

    const [regristroCorrecto, setRegistroCorrecto]=useState(false)

    const [mostarError, setMostrarError]=useState(false)

    const [formValue, setFormValue] = useState({
        tipoUsuario: 'ong'
        
    });
    
    const monstrarLogin=()=>{
        setShowLogin(prev => !prev)
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const res = await axios.post('/api/register', formValue)
            setRegistroCorrecto(true)

        }catch(error){
            if(error.response.status==403){
                setMostrarError(()=>true)
            }
        }
       
    }


    return(
        <>                 
                    {mostarError ? <motion.div
                    key="error"
                    initial={{ y: 0-500}}
                    animate={{ y: 0 }}
                    transition={{duration: 0.5 }}
                    exit={{ y: 0-10000}}
                    id="errorMessage" className="bg-red-600 fixed top-10 text-white py-3 px-5 w-5/6 mb-5 rounded-xl text-center flex items-center justify-center"><AiFillWarning className="mx-2" />Este email ya existe</motion.div>:null}
                    {regristroCorrecto==false?
                    <>
                        <h1 className="text-green-700 text-4xl font-semibold mb-10">Registrar ONG</h1>
                        <div className="bg-green-700 text-white w-70 py-5 px-10 rounded-md shadow-md shadow-gray-900">
                        <form onSubmit={handleSubmit} className="flex flex-col justify-center">
                            <label className="mt-5">Email:</label>
                            <input className="h-9 rounded-lg text-black px-2" onChange={handleChange} type="text" name="email"/>
                            <label className="mt-5">Contraseña:</label>
                            <input className="h-9 rounded-lg text-black px-2" onChange={handleChange} type="password" name="clave"/>
                            <label className="mt-5">Nombre:</label>
                            <input className="h-9 rounded-lg text-black px-2" onChange={handleChange} type="text" name="nombre"/>
                            <label className="mt-5">Descripción:</label>
                            <textarea rows="3" className="h-9 rounded-lg text-black px-2" onChange={handleChange} type="text" name="descripcion"/>
                            <div className="columns-2 mt-5">
                                <div>
                                    <label className="mt-5">Dirección:</label><br />
                                    <input className="h-9 rounded-lg text-black px-2" onChange={handleChange} type="text" name="direccion"/><br />
                                </div>
                                <div>
                                    <label className="mt-5">Teléfono:</label><br />
                                    <input className="h-9 rounded-lg text-black px-2" onChange={handleChange} type="text" name="telefono"/>
                                </div>
                            </div>
                            <button type="submit" className="bg-black rounded-lg mt-10 px-5 py-2">Registrarse</button>
                        </form>

                        </div>
                    </>
                    :<>
                        <h1 className="text-4xl text-green-700 mb-10">¡Usuario registrado!</h1>
                        <p className="text-green-700">Comprueba tu correo para confirmar tu registro</p>
                    </>}
 
        </>
        
    )
}
export default RegisterONG