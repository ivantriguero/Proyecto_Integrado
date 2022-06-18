import NavBar from "../components/NavBar"
import { motion } from "framer-motion"
import { useState } from "react"
import Login from "./Login"

const ONGS = () =>{

    const [showLogin, setShowLogin] =useState(false)

    return (
        <>

        <Login showLogin={showLogin} setShowLogin={setShowLogin}/>
        <motion.div
        initial={{ y: 0-1000,opacity:0 }}
        animate={{ y: 0, opacity:1 }}
        transition={{duration: 1 }}
        exit={{ y: 0-1000,opacity:0 }}
        >
        <NavBar showLogin={showLogin} setShowLogin={setShowLogin} />
        </motion.div>
        <motion.div
        initial={{opacity:0 }}
        animate={{opacity:1 }}
        transition={{duration: 1 }}
        exit={{opacity:0 }}
        >

        <div className="py-20 text-gray-700 px-40 w-full flex justify-center items-center">
            <div className="flex flex-col justify-center items-center px-20">
                <motion.div
            initial={{opacity:0, x:2000 }}
            animate={{opacity:1, x:0 }}
            transition={{duration: 1 }}
            exit={{opacity:0, x:2000 }}
            >
                <img className="rounded-lg my-5 shadow-lg" src="/ong2.jpg"></img>
            </motion.div>
                <h1 className="mb-10 text-5xl font-bold">Cualquiera puede probar</h1>
                <p className="text-center">Cualquiera puede registrarse y realizar sus propuestas para esperar las donaciones de los usuarios más caritativos</p>
            </div>
        </div>
        <div className="grid grid-cols-2 p-10">
            <div className="pb-10">
                <h1 className="border-b-4 border-green-600 text-4xl py-3">ONGs</h1>
                <p className="py-3">
                    Unete a la misión de muchas otras ONGs en el mundo. Las ONG tienen como características ser organizaciones que trabajan en más profunda relación con las personas, que lo que lo hacen los programas gubernamentales. Una de las principales causas para que funcionen mejor en el ámbito social y de emergencias es que son organismos poco burocratizados y más ágiles.
                    Una causa noble puede unir a las a personas. Ya sea de carácter secular o religioso, dedicadas a actividades de asistencia social, obras de misericordia, caridad cristiana, solidaridad en caso de calamidades, auxilio a desamparados, etc.
                    <br />
                    Las personas con intereses similares se unen para dar vida a una iniciativa. Todo empieza con una causa y en efecto hay cientos de excelentes iniciativas. Incluso pueden tener sus páginas en redes sociales bajo los términos:  “Causa” o “Comunidad”, por ejemplo.
                </p>
                </div>
                <div className="m-5 flex justify-center items-center p-10">
                    <div className="overflow-hidden rounded-xl rotate-12">
                       <img className="" src="/ong2.png" />  
                    </div>
                </div>

            </div>
        </motion.div>
        </>
    )
}

export default ONGS