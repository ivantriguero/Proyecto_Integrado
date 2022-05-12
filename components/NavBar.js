import Link from "next/link"
import {FaLeaf} from "react-icons/fa"

const NavBar = ({showLogin, setShowLogin}) => {

    const monstrarLogin=()=>{
        setShowLogin(prev => !prev)
    }

    return (
        <>
        <nav className="px-20 py-5 transparent flex fixed top-0 left-0 right-0 text-white justify-between">
            <FaLeaf />
            <ul className="flex">
                <li className="px-3">Sobre Nosotros</li>
                <li className="px-3">Servicios</li>
                <li className="px-3">ONGs</li>
                <li className="px-3">Registrarse</li>
            </ul>
            <button onClick={monstrarLogin} className="bg-green-500 px-5 py-2 rounded-full hover:bg-green-600">Iniciar sesión</button>
        </nav>
        </>
    )
}

export default NavBar