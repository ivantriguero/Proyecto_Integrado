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

const Register = ({showLogin, setShowLogin}) => {
    const router = useRouter()

    const [regristroCorrecto, setRegistroCorrecto]=useState(false)

    const [avisoDNI, setAvisoDNI]=useState(false)

    const [mostarError, setMostrarError]=useState(false)

    const [formValue, setFormValue] = useState({
        tipoUsuario: 'don'
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
        const {email, clave, nombre, dni, telefono}=formValue
        console.log(email)
        console.log(clave)
        e.preventDefault()
        if(dni.length>9){
            setAvisoDNI(true)
        }
        try{
            const res = await axios.post('/api/register', formValue)
            setRegistroCorrecto(true)
            setMostrarError(()=>false)


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
                        <h1 className="text-green-700 text-4xl font-semibold mb-10">Registrar donante</h1>
                        <div className="bg-green-700 text-white w-70 py-5 px-10 rounded-md shadow-md shadow-gray-900">
                        <form onSubmit={handleSubmit} className="flex flex-col justify-center">
                            <label className="mt-5">Email:</label>
                            <input className="h-9 rounded-lg text-black px-2" onChange={handleChange} type="text" name="email"/>
                            <label className="mt-5">Contraseña:</label>
                            <input className="h-9 rounded-lg text-black px-2" onChange={handleChange} type="password" name="clave"/>
                            <label className="mt-5">Nombre:</label>
                            <input className="h-9 rounded-lg text-black px-2" onChange={handleChange} type="text" name="nombre"/>
                            <div className="columns-2 mt-5">
                                <div>
                                    <label className="mt-5">DNI:</label><br />
                                    <input className="h-9 rounded-lg text-black px-2" onChange={handleChange} type="text" name="dni"/><br />
                                    {avisoDNI?<span className="text-red-400">Este DNI no tiene el formato correcto.<br />Recuerda xxxxxxxxA</span>:null}
                                </div>
                                <div>
                                    <label className="mt-5">Teléfono:</label><br />
                                    <input className="h-9 rounded-lg text-black px-2" onChange={handleChange} type="text" name="telefono"/>
                                </div>
                            </div>
                            <button type="submit" className="bg-black text-white rounded-lg mt-10 px-5 py-2">Registrarse</button>
                        </form>

                        </div>
                    </>
                    :<>
                        <h1 className="text-4xl text-green-800 mb-10">¡Usuario registrado!</h1>
                        <p className="text-green-800">Comprueba tu correo para confirmar tu registro</p>
                    </>} 
        </>
        
    )
}
export default Register