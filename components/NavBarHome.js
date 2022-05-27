import Link from "next/link"
import {FaLeaf} from "react-icons/fa"

const NavBarHome = ({showLogin, setShowLogin}) => {

    const monstrarLogin=()=>{
        setShowLogin(prev => !prev)
    }

    return (
        <>
        <nav className="px-20 py-5 transparent fixed top-0 left-0 right-0 text-white justify-between">
            <div className="grid grid-cols-3">
                <button className="text-2xl"><FaLeaf /></button>
                <div className="flex justify-center">
                    <Link href="/sobreNosotros"><button className="px-3">Sobre Nosotros</button></Link>
                    <Link href="/ONGS"><button className="px-3">ONGs</button></Link>
                    <Link href="/RegisterPage"><button className="px-3">Registrarse</button></Link>
                </div>
                <div className="flex justify-end">
                    <button onClick={monstrarLogin} className="bg-green-500 px-5 w-1/2 py-2 rounded-full hover:bg-green-600">Iniciar sesión</button>
                </div>
            </div>
        </nav>
        </>
    )
}

export default NavBarHome