import { motion, AnimatePresence } from "framer-motion"
import {BiArrowToLeft} from 'react-icons/bi'
import {AiFillWarning} from 'react-icons/ai'
import { useState } from "react"
import axios from "axios"
import jwt from 'jsonwebtoken'
import { serverRuntimeConfig } from '../next.config'
import cookieCutter from 'cookie-cutter'
import { useRouter } from "next/router"
import Modal from '../components/Modal'

const Login = ({showLogin, setShowLogin}) => {
    const router = useRouter()

    const [mostarError, setMostrarError]=useState(false)

    const [mostarErrorPass, setMostrarErrorPass]=useState(false)

    const [showModal, setShowModal]=useState(false)

    const [showModalPass, setShowModalPass]=useState(false)

    const openModalPass = (e) => {
        setShowModalPass(prev => !prev)
    }

    const [formValue, setFormValue] = useState({
        email : '',
        clave : ''
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
        const {email, clave}=formValue
        e.preventDefault()
        try{
            const res = await axios.post('/api/login', {
                email:[email],
                clave: [clave]
            })
            const accessToken=res.data
            cookieCutter.set('accessToken', accessToken)
    
            console.log(accessToken)
            jwt.verify(accessToken, serverRuntimeConfig.secret, function(err, decoded) {
                if(err){
                    console.log(err)
                }
                    const user=decoded
                    if (user.tipoUsuario=="admin"){
                        router.push({
                            pathname: '/admin/usuarios'
                        })
                    }else if(user.tipoUsuario=="don"){
                        router.push({
                            pathname: '/userPage'
                        })
                    }else if(user.tipoUsuario=="ong"){
                        router.push({
                            pathname: '/ONGPage'
                        })
                    }
                    console.log(user)
              });
        }catch(error){
            if(error.response.data.message=="Este usuario no existe"){
                setMostrarError(()=>true)
                console.log(error.response.data)
            }else if(error.response.data.message=="Este email no está confirmado"){
                setShowModal(()=>true)
                console.log(error.response.data)
            }
        }
       
    }

    const [showMenPass, setShowMenPass]= useState(false)

    const handleSubmitPass = async (e) => {
        const {email}=formValue
        e.preventDefault()
        try{
            setShowMenPass(true)
            const res = await axios.post('/api/recuperarpass', {
                email:[email]
            })

        }catch(error){
            if(error.response.data.message=="Este correo no existe"){
                setMostrarErrorPass(()=>true)
            }else if(error.response.data.message=="Este email no está confirmado"){
                setShowModal(()=>true)
            }
        }
       
    }


    return(
        <AnimatePresence>

        {showLogin ? 

            <motion.div
                key="login"
                initial={{ y: 0-1000}}
                animate={{ y: 0 }}
                transition={{duration: 1 }}
                exit={{ y: 0-10000}}
                id="login" className="container fixed z-40 bg-green-700 h-screen flex flex-col items-center justify-center">
                <Modal id="modalAviso" showModal={showModal} setShowModal={setShowModal}>
                    <div className="py-10 px-10">
                        <h1>Primero tienes que confirmar tu email</h1>
                    </div>
                </Modal>
                <Modal id="modalAviso" showModal={showModalPass} setShowModal={setShowModalPass}>
                    <div className="py-10 px-10">
                        {showMenPass? <>
                        <h1 className="text-center text-lg text-gray-700">Mensaje enviado a tu correo</h1>
                        <p>Hemos enviado un mensaje a tu correo para resetear tu contraseña</p>
                        </>:
                        <>
                        <h1 className="text-center text-lg text-gray-700">Introduce tu correo para recuperar tu contraseña</h1>
                        <form onSubmit={handleSubmitPass}>
                            <input type="email" onChange={handleChange} placeholder="Email" name="email" className="px-2 mb-2 w-full mt-5 border-2 border-gray-500 py-1 rounded-lg" />
                            {mostarErrorPass ? <span className="text-red-700 w-1/2 pl-1">Este correo no está registrado</span>:null}
                            <button type="submit" className="w-full px-5 py-3 rounded-lg bg-green-700 hover:bg-green-900 text-white mt-5">Enviar correo</button>
                        </form>
                        </>
                        }
                        
                        
                    </div>
                </Modal>

                <button  onClick={monstrarLogin}>
                    <a className="absolute border-2 border-transparent rounded-full top-5 left-5 hover:border-2 hover:rounded-full hover:border-black">
                        <BiArrowToLeft className="text-4xl" />
                    </a>
                </button>
                    
                    
                    {mostarError ? <motion.div
                    key="error"
                    initial={{ y: 0-500}}
                    animate={{ y: 0 }}
                    transition={{duration: 0.5 }}
                    exit={{ y: 0-10000}}
                    id="errorMessage" className="bg-red-600 fixed top-10 text-white py-3 px-5 w-2/6 mb-5 rounded-xl text-center flex items-center justify-center"><AiFillWarning className="mx-2" />El email o la contraseña no son correctos</motion.div>:null}
                    <div className="bg-black text-white w-70 h-2/3 py-10 px-10 rounded-md shadow-md shadow-gray-900">
                    <form onSubmit={handleSubmit} className="flex flex-col justify-center">
                        <h1 className="text-center">Inicia sesión en tu cuenta</h1>
                        <label className="mt-5">Email:</label>
                        <input className="h-9 rounded-lg text-black px-2" onChange={handleChange} type="text" name="email"/>
                        <label className="mt-5">Contraseña:</label>
                        <input className="h-9 rounded-lg text-black px-2" onChange={handleChange} type="password" name="clave"/>
                        <button type="submit" className="bg-green-500 rounded-lg mt-10 px-5 py-2 hover:bg-green-600">Iniciar sesión</button>
                    </form>
                    <button onClick={openModalPass} className="mt-2 text-sm decoration-1 hover:underline decoration-solid">¿Olvidaste la contraseña?</button>

                    </div>
                </motion.div>
            :null}

            
        </AnimatePresence>
        
    )
}
export default Login