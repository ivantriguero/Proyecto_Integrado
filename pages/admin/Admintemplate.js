import {FaLeaf, FaHands, FaUserAlt, FaProjectDiagram, FaVectorSquare,FaForward, FaSignOutAlt} from "react-icons/fa"
import Link from "next/link"
import { motion } from "framer-motion"
import Cookies from 'js-cookie';
import { useRouter } from "next/router"

const AdminTemplate = ({children, button, title}) => {

    const router = useRouter();

    const cerrarSesion = () => {
        Cookies.remove('accessToken')
        router.replace(router.asPath);
    }

    return (
        <>
            <div className="container flex">    
                <div id="slidebar" className="flex flex-col justify-between bg-slate-800 h-screen w-1/5 text-white">
                    <div>
                        <div className="text-5xl flex justify-center flex-col items-center p-5">
                            <FaLeaf />
                            <h1 className="text-xl text-center mt-5">Bienvenido<br />administrador</h1>    
                        </div>
                        <ul>
                            <Link href="/admin/usuarios"><li id="usuarios" className="py-3 flex items-center hover:bg-slate-900 menu-item"><FaUserAlt className="mx-5"/>Usuarios</li></Link>
                            <Link href="/admin/ongs"><li id="ongs" className="py-3 flex items-center hover:bg-slate-900 menu-item"><FaHands className="mx-5"/>ONGs</li></Link>
                            <Link href="/admin/proyectos"><li id="proyectos" className="py-3 flex items-center hover:bg-slate-900 menu-item"><FaProjectDiagram className="mx-5"/>Proyectos</li></Link>
                        </ul>
                    </div>
                    <button onClick={cerrarSesion} className="py-3 flex items-center hover:bg-slate-900 menu-item"><FaSignOutAlt className="mx-5"/>Cerrar sesión</button>
                </div>
                <div className="w-full flex flex-col">
                    <motion.div
                    initial={{ y: 0-1000,opacity:0 }}
                    animate={{ y: 0, opacity:1 }}
                    transition={{duration: 1 }}
                    exit={{ y: 0-1000,opacity:0 }}
                    id="topbar" className="w-full h-14 border-b-2 shadow-lg px-5 flex justify-between items-center">
                        <h1>{title}</h1>
                        {button}
                    </motion.div>
                    <div className="w-full h-96 grow flex flex-col justify-between items-center py-7">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminTemplate