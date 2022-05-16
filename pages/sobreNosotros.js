import NavBar from "../components/NavBar"
import { motion } from "framer-motion"

const sobreNosotros = () =>{
    return (
        <>
        <motion.div
        initial={{ y: 0-1000,opacity:0 }}
        animate={{ y: 0, opacity:1 }}
        transition={{duration: 1 }}
        exit={{ y: 0-1000,opacity:0 }}
        >
        <NavBar />
        </motion.div>
        <motion.div
        initial={{opacity:0 }}
        animate={{opacity:1 }}
        transition={{duration: 1 }}
        exit={{opacity:0 }}
        >

        <div className="py-20 text-gray-700 px-40 w-full flex justify-center items-center">
            <div className="flex flex-col justify-center items-center px-20">
                <h1 className="mb-10 text-5xl font-bold">Texto de ejemplo</h1>
                <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rutrum, libero in sagittis mattis, sem lorem tincidunt lacus, eu varius nisi magna in nunc. Nam gravida varius tellus et accumsan. Maecenas et ligula ante. Integer porttitor maximus tortor, et vulputate ligula bibendum eu. Cras accumsan ipsum enim, sit amet congue felis pulvinar quis. Nunc vitae elit ac nisi tempor viverra et in augue. Maecenas neque elit, gravida eget quam sit amet, aliquam maximus ipsum. In ac felis ac elit ultricies vehicula. Maecenas tincidunt molestie nunc in luctus.</p>
            </div>
        </div>
        <div className="grid grid-cols-2 p-10">
            <div className="pb-10">
                <h1 className="border-b-4 border-green-600 text-4xl py-3">MISIÓN y VISIÓN</h1>
                <p className="py-3">
                    Misión
                    <br />
                    La Plataforma de ONG de Acción Social es una organización cuya misión consiste en defender los derechos de los grupos y personas más desfavorecidos, promover la participación en el ámbito de la Acción Social, generar cambio social, representar a sus organizaciones ante los poderes públicos y liderar a éstas en torno a un proyecto compartido.
                    <br />
                    Visión
                    <br />
                    La visión de la Plataforma de ONG de Acción Social es ser una organización de referencia para las entidades del Tercer Sector de Acción Social de forma que encuentren en nuestra organización un cauce que multiplique los efectos positivos de la acción social gracias a que:
                    <br />
                    Hemos alcanzado el estatus de Agente Social.
                    Somos un referente e interlocutor reconocido ante la sociedad civil, ante las Administraciones Públicas y ante las propias ONG de Acción Social.
                    Lideramos el reconocimiento, el desarrollo, la vertebración y la cohesión del Tercer Sector de Acción Social.
                    Somos independientes y tiene más representatividad.

                </p>
                </div>
                <div className="m-5 flex justify-center items-center p-10">
                    <div className="overflow-hidden rounded-xl rotate-12">
                       <img className="" src="/ong.jpg" />  
                    </div>
                </div>
                <div className="m-5 flex justify-center items-center p-10">
                    <div className="overflow-hidden rounded-xl rotate-12">
                       <img className="" src="/ong.jpg" />  
                    </div>
                </div>
                <div className="py-10">
                <h1 className="border-b-4 border-green-600 text-4xl py-3">MISIÓN y VISIÓN</h1>
                <p className="py-3">
                    Misión
                    <br />
                    La Plataforma de ONG de Acción Social es una organización cuya misión consiste en defender los derechos de los grupos y personas más desfavorecidos, promover la participación en el ámbito de la Acción Social, generar cambio social, representar a sus organizaciones ante los poderes públicos y liderar a éstas en torno a un proyecto compartido.
                    <br />
                    Visión
                    <br />
                    La visión de la Plataforma de ONG de Acción Social es ser una organización de referencia para las entidades del Tercer Sector de Acción Social de forma que encuentren en nuestra organización un cauce que multiplique los efectos positivos de la acción social gracias a que:
                    <br />
                    Hemos alcanzado el estatus de Agente Social.
                    Somos un referente e interlocutor reconocido ante la sociedad civil, ante las Administraciones Públicas y ante las propias ONG de Acción Social.
                    Lideramos el reconocimiento, el desarrollo, la vertebración y la cohesión del Tercer Sector de Acción Social.
                    Somos independientes y tiene más representatividad.

                </p>
                </div>

            </div>
        </motion.div>
        </>
    )
}

export default sobreNosotros