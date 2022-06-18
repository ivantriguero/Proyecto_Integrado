import {BsFillArrowUpCircleFill} from 'react-icons/bs'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaLeaf } from 'react-icons/fa'
import { useState } from 'react'
import Modal from '../components/Modal'
import Register from './Register'
import RegisterONG from './RegisterONG'

const RegisterPage = (proyectos) => {

    const [showRegisterDon, setShowRegisterDon]=useState(false)
    const openModalRegisterDon = (e) => {
        setShowRegisterDon(prev => !prev)
    }

    const [showRegisterONG, setShowRegisterONG]=useState(false)
    const openModalRegisterONG = (e) => {
        setShowRegisterONG(prev => !prev)
    }

    return (
        <>
        <Register showRegister={showRegisterDon} setShowRegister={setShowRegisterDon}/>
        <RegisterONG showRegister={showRegisterONG} setShowRegister={setShowRegisterONG}/>
        <motion.div
        initial={{ y: 0-1000}}
        animate={{ y: 0 }}
        transition={{duration: 1 }}
        exit={{ y: 0-10000}}
        className='w-full flex flex-col h-screen bg-gray-100'>
            <Link href="/"><button className='w-full py-3 bg-green-800 hover:bg-green-900 flex justify-center items-center text-2xl text-white'><BsFillArrowUpCircleFill /></button></Link>
            <div className='flex grow justify-center items-center'>
                <div className='w-4/5 bg-white rounded-lg shadow-xl pl-10 flex'>
                    <div className='w-3/4 pb-10'>
                        <h1 className='text-4xl pt-10 pb-5 text-gray-700 border-b-4 border-green-800'>Registrarse</h1>
                        <h2 className='text-xl mt-10'>¿Quieres realizar donaciones?</h2>
                        <button onClick={openModalRegisterDon} className='bg-green-800 px-10 w-70 py-3 mt-3 text-white rounded-lg hover:bg-green-900'>Registrarse como Donante</button>
                        <h2 className='text-xl mt-10'>¿Quieres publicar peticiones?</h2>
                        <button onClick={openModalRegisterONG} className='bg-green-800 px-10 py-3 mt-3 text-white rounded-lg hover:bg-green-900'>Registrarse como ONG</button>
                    </div>
                    <div className='w-1/4 flex text-8xl justify-center items-center bg-green-800 text-white rounded-r-lg'>
                        <FaLeaf />
                    </div>
                </div>
            </div>
        </motion.div>
        </>    
    )
}

export default RegisterPage