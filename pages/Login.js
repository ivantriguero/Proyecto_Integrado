import { motion } from "framer-motion"
import {BiArrowToLeft} from 'react-icons/bi'
import {AiFillWarning} from 'react-icons/ai'
import Link from "next/link"
import { useState } from "react"
import axios from "axios"
import jwt from 'jsonwebtoken'
import { serverRuntimeConfig } from '../next.config'
import cookieCutter from 'cookie-cutter'
import { useRouter } from "next/router"

const Login = () => {
    const router = useRouter()
    const [formValue, setFormValue] = useState({
        email : '',
        clave : ''
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
                            pathname: '/admin'
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
            if(error.response.status==403){
                console.log('hola que tal')
                document.getElementById('errorMessage').style.display="flex";
            }
        }
       
    }


    return(
        <motion.div
        initial={{ y: 0-1000,opacity:0 }}
        animate={{ y: 0, opacity:1 }}
        exit={{ y: 0-1000,opacity:0 }}
        id="login" className="container bg-green-700 h-screen flex flex-col items-center justify-center">
            <Link href="/">
                <a className="absolute border-2 border-transparent rounded-full top-5 left-5 hover:border-2 hover:rounded-full hover:border-black">
                    <BiArrowToLeft className="text-4xl" />
                </a>
            </Link>
            <div id="errorMessage" style={{display:'none'}} className="bg-red-600 text-white py-3 px-5 w-2/6 mb-5 rounded-xl text-center flex items-center justify-center"><AiFillWarning className="mx-2" />Este usuario no existe</div>
            <div className="bg-black text-white w-70 h-2/3 py-10 px-10 rounded-md shadow-md shadow-gray-900">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center">
                <h1 className="text-center">Inicia sesión en tu cuenta</h1>
                <label className="mt-5">Email:</label>
                <input className="h-9 rounded-lg text-black px-2" onChange={handleChange} type="text" name="email"/>
                <label className="mt-5">Contraseña:</label>
                <input className="h-9 rounded-lg text-black px-2" onChange={handleChange} type="password" name="clave"/>
                <button type="submit" className="bg-green-500 rounded-lg mt-10 px-5 py-2 hover:bg-green-600">Iniciar sesión</button>
                <a className="mt-2 text-sm">¿Olvidaste la contraseña?</a>
            </form>

            </div>
        </motion.div>
    )
}
export default Login