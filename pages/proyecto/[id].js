import { useRouter } from 'next/router'
import axios from 'axios'
import {BsFillArrowUpCircleFill} from 'react-icons/bs'
import { useState } from 'react'
import Modal from '../../components/Modal'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Post = (proyectos) => {
    const router = useRouter()
    
    const [formValue, setFormValue] = useState({
        cantidad:0
    });

    const [showModalPagar, setShowModalPagar]=useState(false)
    const openModalCrear = () => {
        setShowModalPagar(prev => !prev)
    }

    const handleChange = (e) =>{
        const {name, value} = e.target
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
        console.log(formValue)
    }

    const formatDate = (date) => {
        let d = new Date(date)
        let month=d.getMonth()+1<10?0+(d.getMonth()+1).toString():d.getMonth()+1
        let day=d.getDate()<10?0+(d.getDate()).toString():d.getDate()
        const formatedDate=day+"-"+month+"-"+d.getFullYear()
        return formatedDate
    }

    return (
        <>
        <Modal showModal={showModalPagar} setShowModal={setShowModalPagar}>
            <div className="py-10 px-10">
                <h1 className="text-center text-2xl mb-10 text-gray-800">Selecciona la cantidad</h1>
                <form>
                    <input onChange={handleChange} className="w-full" name="cantidad" type="range" min="0" max="100"></input>
                    <div className='flex justify-center'>
                        <input onChange={handleChange} className="w-10 border-2 border-gray-800 text-center" type="number" name="cantidad" value={formValue.cantidad}/>
                    </div>
                    <button type='submit' className='bg-green-800 hover:bg-green-900 px-7 w-full mt-5 py-3 rounded-lg text-white'>Donar</button>
                </form>
            </div>
        </Modal>
        <motion.div
        initial={{ y: 0-1000}}
        animate={{ y: 0 }}
        transition={{duration: 1 }}
        exit={{ y: 0-10000}}
        className='w-full flex flex-col h-screen bg-gray-100'>
            <Link href="/userPage"><button className='w-full py-3 bg-green-800 hover:bg-green-900 flex justify-center items-center text-2xl text-white'><BsFillArrowUpCircleFill /></button></Link>
            <div className='flex grow justify-center items-center'>
                <div className='w-4/5 bg-white rounded-lg shadow-xl pl-10 flex'>
                    <div className='w-3/4'>
                        <h1 className='text-4xl pt-10 pb-5 text-gray-700 border-b-4 border-green-800'>{proyectos.proyectos.tituloProyecto}</h1>
                        <p className='text-xl py-5 my-5 px-5 border-2 border-gray-100'>{proyectos.proyectos.descripcionProyecto}</p>
                        <div className='pt-10 pb-5'>
                            <span className='text-lg text-green-800'>Dinero donado:</span> {proyectos.proyectos.dineroProyecto} €
                            <button onClick={openModalCrear} className="py-5 bg-green-800 text-white w-full hover:bg-green-900 rounded-lg text-2xl text-center mt-10">Donar</button>
                        </div>
                        <div className='pt-10 pb-5'>
                            <span className='mr-20'>Fecha inicial: {formatDate(proyectos.proyectos.fechaProyecto)}</span><span>Fecha final: {formatDate(proyectos.proyectos.fechaLimiteProyecto)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
        </>    
    )
}

export const getServerSideProps =async context =>{
    let token = context.req.cookies['accessToken']
    if(token==undefined||token==null){
        token=''
    }

      try{
        const { id } = context.params
        const { data }= await axios.get('http://localhost:3000/api/proyectos',{
            headers:{
                authorization: token
            },
            params:{
                id: id
            }
        })
        const proyectos=data
        return {
            props: {
                proyectos: proyectos
            }
        }
      }catch(error){
        return error
      }

}

export default Post