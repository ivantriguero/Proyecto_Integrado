import Link from "next/link"
import {FaLeaf} from "react-icons/fa"

const NavBar = () => {
    return (
        <>
        <nav className="px-20 py-5 shadow-lg bg-white flex sticky z-20 top-0 left-0 right-0 text-gray-700 items-center justify-between">
            <Link href="/"><button><FaLeaf  className="text-2xl text-green-700"/></button></Link>
            <ul className="flex">
                <Link href="/sobreNosotros"><button className="px-3 font-medium">Sobre Nosotros</button></Link>
                <Link href="/ONGS"><button className="px-3 font-medium">ONGs</button></Link>
                <button className="px-3 font-medium">Registrarse</button>
            </ul>
            <button className="px-5 py-2 bg-green-700 rounded-lg text-white hover:bg-green-800">Iniciar sesión</button>
        </nav>
        </>
    )
}

export default NavBar