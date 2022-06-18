import { useRouter } from 'next/router'
import axios from 'axios'
import {BsFillArrowUpCircleFill} from 'react-icons/bs'
import { useState } from 'react'
import Modal from '../../components/Modal'
import Link from 'next/link'
import { serverRuntimeConfig } from '../../next.config'
import { motion } from 'framer-motion'
import jwt from 'jsonwebtoken'

const Post = (props) => {
    
    const [formValue, setFormValue] = useState({
        code: props.user.token,
        id: props.user.idUsuario,
        clave: ''
    });

    const [showModal, setShowModal]=useState(false)
    const openModal = () => {
        setShowModal(prev => !prev)
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
            const res = await axios.post('/api/recuperarpass/resetpass', formValue)
            if(res.data.message=="clave modificada"){
                setShowModal(()=>true)
            }
            
        }catch(error){
        }
       
    }

    return (
        <>
        <Modal showModal={showModal} setShowModal={setShowModal}>
            <div className="py-10 px-10">
                <h1 className="text-center text-2xl mb-10 text-gray-800">Clave modificada correctamente</h1>
                <Link href="/"><button className='bg-green-700 hover:bg-green-900 text-white rounded-lg py-3 px-5 w-full mt-2'>Volver a inicio</button></Link>

            </div>
        </Modal>
        <motion.div
        initial={{ y: 0-1000}}
        animate={{ y: 0 }}
        transition={{duration: 1 }}
        exit={{ y: 0-10000}}
        className='w-full flex flex-col h-screen bg-gray-100'>
            <div className='flex grow justify-center items-center'>
                <div className='w-4/5 bg-white rounded-lg shadow-xl pl-10 flex'>
                    <div className='w-full py-5'>
                       {props.ok?<><h1 className='text-2xl text-center mb-5'>Reestablecer contraseña</h1>
                        <form onSubmit={handleSubmit}>
                            Nueva contraseña:
                            <input type="password" name="clave" onChange={handleChange} className='w-full px-2 py-1 rounded-lg border-2 border-gray-700'></input>
                            <div className='flex justify-center'>
                                <button type='submit' className='bg-green-700 hover:bg-green-900 rounded-lg text-white w-3/4 py-2 mt-5'> Reestablecer </button>
                            </div>
                        </form>
                       </>
                       :<>
                       <h1 className='text-xl text-center'>No se puede reestablecer la contraseña</h1>
                       <div className='flex justify-center'><Link href="/"><button className='w-3/4 px-5 py-3 bg-green-700 hover:bg-green-800 rounded-lg text-white mt-5'>Volver al inico</button></Link></div>
                       </>}

                    </div>
                </div>
            </div>
        </motion.div>
        </>    
    )
}

export const getServerSideProps =async context =>{
    
    const { token } = context.params
      
    try{

        const { data }= await axios.get('http://localhost:3000/api/recuperarpass/user', {
            data:{
                token : token
            }
        })
        const user=data[0]
        
        return {
            props: {
                ok: true,
                user
            }
        }
    }catch(error){

        return error
      }

}

export default Post