import { motion, AnimatePresence } from "framer-motion"
import {BiArrowToLeft} from 'react-icons/bi'
import {AiFillWarning} from 'react-icons/ai'
import Link from "next/link"
import { useState } from "react"
import axios from "axios"
import {BsFillArrowRightCircleFill} from 'react-icons/bs'
import jwt from 'jsonwebtoken'
import { serverRuntimeConfig } from '../next.config'
import cookieCutter from 'cookie-cutter'
import { useRouter } from "next/router"

const RegisterONG = ({showRegister, setShowRegister}) => {

    const [regristroCorrecto, setRegistroCorrecto]=useState(false)

    const [mostarError, setMostrarError]=useState(false)

    const [formValue, setFormValue] = useState({
        tipoUsuario: 'ong'
        
    });

    const openModal = (e) => {
        setShowRegister(prev => !prev)
    }
    
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
        <AnimatePresence>
            {showRegister?
                <motion.div
                key="registerONG"
                initial={{ x: 2000}}
                animate={{ x: 0 }}
                transition={{duration: 1 }}
                exit={{ x: 10000}}
                className="fixed bg-white w-full h-full"
                >                 
                {mostarError ? <motion.div
                key="error"
                initial={{ y: 0-500}}
                animate={{ y: 0 }}
                transition={{duration: 0.5 }}
                exit={{ y: 0-10000}}
                id="errorMessage" className="bg-red-600 fixed top-10 text-white py-3 px-5 w-5/6 mb-5 rounded-xl text-center flex items-center justify-center"><AiFillWarning className="mx-2" />Este email ya existe</motion.div>:null}
               
                <>
                <div className="flex h-screen">
                    <div className="w-full">
                    <h1 className="pt-10 text-green-700 text-4xl font-semibold text-center mb-10">Registrar ONG</h1>
                    <div className="flex flex-col items-center">
                    <div className="w-1/2 py-5 px-10 rounded-md shadow-md">
                    {regristroCorrecto==false?
                    <form onSubmit={handleSubmit} className="flex flex-col justify-center">
                    <div className="columns-2 mt-5">
                            <div>
                            <label className="mt-5">Email:</label>
                        <input className="h-9 rounded-lg bg-gray-300 text-black px-2" onChange={handleChange} type="text" name="email"/>
                            </div>
                            <div>
                            <label className="mt-5">Contraseña:</label>
                        <input className="h-9 rounded-lg bg-gray-300 text-black px-2" onChange={handleChange} type="password" name="clave"/>
                            </div>
                        </div>
                        <label className="mt-5">Nombre:</label>
                        <input className="h-9 rounded-lg bg-gray-300 text-black px-2" onChange={handleChange} type="text" name="nombre"/>
                        <label className="mt-5">Descripción:</label>
                        <textarea rows="3" className="h-9 rounded-lg bg-gray-300 text-black px-2" onChange={handleChange} type="text" name="descripcion"/>
                        <div className="columns-2 mt-5">
                            <div>
                                <label className="mt-5">Dirección:</label><br />
                                <input className="h-9 rounded-lg bg-gray-300 text-black px-2" onChange={handleChange} type="text" name="direccion"/><br />
                            </div>
                            <div>
                                <label className="mt-5">Teléfono:</label><br />
                                <input className="h-9 rounded-lg bg-gray-300 text-black px-2" onChange={handleChange} type="text" name="telefono"/>
                            </div>
                        </div>
                        <button type="submit" className="bg-black rounded-lg text-white mt-10 px-5 py-2">Registrarse</button>
                    </form>:<>
                        <h1 className="text-4xl text-green-700 mb-10">¡Usuario registrado!</h1>
                        <p className="text-green-700">Comprueba tu correo para confirmar tu registro</p>
                    </>}
                    </div>
                    </div>
                    </div>
                    <button onClick={openModal} className="bg-green-700 text-white flex items-center text-2xl px-3 hover:bg-green-800">
                        <BsFillArrowRightCircleFill />
                    </button>
                    </div>
                </>
                

            </motion.div>:null}
        </AnimatePresence>
    )
}
export default RegisterONG