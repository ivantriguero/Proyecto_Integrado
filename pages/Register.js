import { motion, AnimatePresence } from "framer-motion"
import {BsFillArrowLeftCircleFill} from 'react-icons/bs'
import {AiFillWarning} from 'react-icons/ai'
import Link from "next/link"
import { useState, React } from "react"
import axios from "axios"
import jwt from 'jsonwebtoken'
import { serverRuntimeConfig } from '../next.config'
import cookieCutter from 'cookie-cutter'
import { useRouter } from "next/router"

const Register = ({showRegister, setShowRegister}) => {
    const router = useRouter()

    const openModal = (e) => {
        setShowRegister(prev => !prev)
    }

    const [regristroCorrecto, setRegistroCorrecto]=useState(false)

    const [avisoDNI, setAvisoDNI]=useState(false)

    const [mostarError, setMostrarError]=useState(false)

    const [formValue, setFormValue] = useState({
        tipoUsuario: 'don'
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
        const {email, clave, nombre, dni, telefono}=formValue
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
        <AnimatePresence>
            {showRegister?
                <motion.div
                key="register"
                initial={{ x: 0-2000}}
                animate={{ x: 0 }}
                transition={{duration: 1 }}
                exit={{ x: 0-10000}}
                className="fixed bg-white w-full h-full">
                    {mostarError ? <motion.div
                    key="error"
                    initial={{ y: 0-500}}
                    animate={{ y: 0 }}
                    transition={{duration: 0.5 }}
                    exit={{ y: 0-10000}}
                    id="errorMessage" className="bg-red-600 fixed top-10 text-white py-3 px-5 w-5/6 mb-5 rounded-xl text-center flex items-center justify-center"><AiFillWarning className="mx-2" />Este email ya existe</motion.div>:null}
                    
                    <>
                    <div className="flex h-screen">
                        <button onClick={openModal} className="bg-green-700 text-white flex items-center text-2xl px-3 hover:bg-green-800">
                            <BsFillArrowLeftCircleFill />
                        </button>
                        <div className="w-full">
                        <h1 className="pt-10 text-green-700 text-4xl font-semibold text-center mb-10">Registrar donante</h1>
                        <div className="flex flex-col items-center">
                            <div className="w-1/2 py-5 px-10 rounded-md shadow-md">
                            {regristroCorrecto==false?
                                <form onSubmit={handleSubmit} className="flex flex-col justify-center">
                                    <label className="mt-5">Email:</label>
                                    <input className="h-9 rounded-lg bg-gray-300 text-black px-2" onChange={handleChange} type="text" name="email"/>
                                    <label className="mt-5">Contraseña:</label>
                                    <input className="h-9 rounded-lg bg-gray-300  text-black px-2" onChange={handleChange} type="password" name="clave"/>
                                    <label className="mt-5">Nombre:</label>
                                    <input className="h-9 rounded-lg bg-gray-300  text-black px-2" onChange={handleChange} type="text" name="nombre"/>
                                    <div className="columns-2 mt-5">
                                        <div>
                                            <label className="mt-5">DNI:</label><br />
                                            <input className="h-9 bg-gray-300  rounded-lg text-black px-2" onChange={handleChange} type="text" name="dni"/><br />
                                            {avisoDNI?<span className="text-red-400">Este DNI no tiene el formato correcto.<br />Recuerda xxxxxxxxA</span>:null}
                                        </div>
                                        <div>
                                            <label className="mt-5">Teléfono:</label><br />
                                            <input className="h-9 bg-gray-300  rounded-lg text-black px-2" onChange={handleChange} type="text" name="telefono"/>
                                        </div>
                                    </div>
                                    <button type="submit" className="bg-black text-white rounded-lg mt-10 px-5 py-2">Registrarse</button>
                                </form>:<>
                                    <h1 className="text-4xl text-green-800 mb-10">¡Usuario registrado!</h1>
                                    <p className="text-green-800">Comprueba tu correo para confirmar tu registro</p>
                                </>}
                            </div>
                        </div>
                        </div>
                    </div>
                    </>
                    
                    </motion.div>:null} 
        </AnimatePresence>
        
    )
}
export default Register