import {FaLeaf, FaHands, FaUserAlt, FaProjectDiagram, FaVectorSquare,FaForward, FaSignOutAlt} from "react-icons/fa"
import Link from "next/link"

const AdminTemplate = ({children, button}) => {
    return (
        <>
            <div className="container flex">    
                <div id="slidebar" className="flex flex-col justify-between bg-slate-800 h-screen w-1/5 text-white">
                    <div>
                        <div className="text-5xl flex justify-center flex-col items-center p-5">
                            <FaLeaf />
                            <h1 className="text-xl text-center mt-5">Bienvenido,<br />[Nombre Usuario]</h1>    
                        </div>
                        <ul>
                            <Link href="/admin/usuarios"><li id="usuarios" className="py-3 flex items-center hover:bg-slate-900 menu-item"><FaUserAlt className="mx-5"/>Usuarios</li></Link>
                            <li id="ongs" className="py-3 flex items-center hover:bg-slate-900 menu-item"><FaHands className="mx-5"/>ONGs</li>
                            <li id="proyectos" className="py-3 flex items-center hover:bg-slate-900 menu-item"><FaProjectDiagram className="mx-5"/>Proyectos</li>
                            <li id="categorias" className="py-3 flex items-center hover:bg-slate-900 menu-item"><FaVectorSquare className="mx-5"/>Categorías</li>
                            <li id="peticiones" className="py-3 flex items-center hover:bg-slate-900 menu-item"><FaForward className="mx-5"/>Peticiones</li>
                        </ul>
                    </div>
                    <div className="py-3 flex items-center hover:bg-slate-900 menu-item"><FaSignOutAlt className="mx-5"/>Cerrar sesión</div>
                </div>
                <div className="w-full">
                    <div id="topbar" className="w-full h-14 border-b-2 shadow-lg px-5 flex justify-between items-center">
                        <h1>TopBar</h1>
                        {button}
                    </div>
                    <div className="w-full flex justify-center items-center py-7">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminTemplate