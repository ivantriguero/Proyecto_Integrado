import Link from "next/link"
import {FaLeaf} from "react-icons/fa"

const NavBar = ({showLogin, setShowLogin}) => {

    const monstrarLogin=()=>{
        setShowLogin(prev => !prev)
    }

    return (
        <>
        <nav className="px-20 py-5 shadow-lg bg-white sticky z-20 top-0 left-0 right-0 text-gray-700 items-center justify-between">
            <div className="grid grid-cols-3">
                <Link href="/"><button><FaLeaf  className="text-2xl text-green-700"/></button></Link>
                <ul className="flex">
                    <Link href="/sobreNosotros"><button className="px-3 font-medium">Sobre Nosotros</button></Link>
                    <Link href="/ONGS"><button className="px-3 font-medium">ONGs</button></Link>
                    <Link href="/RegisterPage"><button className="px-3 font-medium">Registrarse</button></Link>
                </ul>
                <div className="flex justify-end">
                    <button onClick={monstrarLogin} className="px-5 w-1/2 py-2 bg-green-700 rounded-lg text-white hover:bg-green-800">Iniciar sesión</button>
                </div>
            </div>
        </nav>
        </>
    )
}

export default NavBar