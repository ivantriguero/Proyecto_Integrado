import Link from "next/link"
import {FaLeaf} from "react-icons/fa"

const NavBarHome = ({showLogin, setShowLogin}) => {

    const monstrarLogin=()=>{
        setShowLogin(prev => !prev)
    }

    return (
        <>
        <nav className="px-20 py-5 transparent flex fixed top-0 left-0 right-0 text-white justify-between">
            <button className="text-2xl"><FaLeaf /></button>
            <ul className="flex">
                <Link href="/sobreNosotros"><button className="px-3">Sobre Nosotros</button></Link>
                <Link href="/ONGPage"><button className="px-3">ONGs</button></Link>
                <button className="px-3">Registrarse</button>
            </ul>
            <button onClick={monstrarLogin} className="bg-green-500 px-5 py-2 rounded-full hover:bg-green-600">Iniciar sesión</button>
        </nav>
        </>
    )
}

export default NavBarHome