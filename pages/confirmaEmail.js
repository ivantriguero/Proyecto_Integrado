import Link from "next/link"
import {BsCheckLg} from 'react-icons/bs'


const confirmaEmail = () =>{
    return(
        <>
        <div className="w-screen h-screen bg-green-700 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg px-20 py-10">
                <div className="w-auto flex justify-center">
                    <span className="rounded-full bg-green-700 p-5 mb-5"><BsCheckLg className="text-white text-8xl" /></span>
                </div>
                <h1 className="text-2xl">Email confirmado correctamente</h1>
                <Link href="/">
                    <button className="mt-10 w-full px-5 bg-green-700 hover:bg-green-800 text-white rounded-lg shadow-lg px-10 py-5">
                        Volver al inicio
                    </button>
                </Link>
            </div>
        </div>
        </>
    )
}

export default confirmaEmail