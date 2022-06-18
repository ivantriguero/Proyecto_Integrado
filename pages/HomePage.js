import { Header } from "../components/HeaderComponent"
import Link from 'next/link'
import NavBarHome from "../components/NavBarHome"
import Login from "./Login"
import { useState } from "react"

const HomePage = () => {
    
    const [showLogin, setShowLogin] =useState(false)

    
    return (
        <>
        <Login showLogin={showLogin} setShowLogin={setShowLogin}/>
        <NavBarHome showLogin={showLogin} setShowLogin={setShowLogin}/>
        <div className="container">
            <div id="Header" className="h-screen text-white text-center place-content-center flex flex-col items-center">
                <div className="w-1/2">
                    <h1 className="pb-10 text-5xl"> Aporta tu granito de arena</h1>
                    <p className="">Haces algo, un pequeño gesto, una pequeña acción, que sumada a otras pequeñas acciones hacen un conjunto muy grande. Pueder aportar tu pequeño grano de arena en esta web, mira entre todas las opciones propuestas por nuestras ONGs y dona a la que creas necesaria, cualquier ayuda es bienvenida</p>
                    <Link href="/RegisterPage"><button className="bg-green-600 mt-5 px-10 py-2 rounded-full hover:bg-green-700">Comenzar</button></Link>
                </div>
            </div>
        </div>        
        </>
    )
}
export default HomePage