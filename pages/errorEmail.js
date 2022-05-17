import Link from "next/link"
import {ImCross} from 'react-icons/im'

const errorEmail = () =>{
    return(
        <>
        <div className="w-screen h-screen bg-red-800 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg px-20 py-10">
            <div className="w-auto flex justify-center">
                    <span className="rounded-full bg-red-800 p-5 mb-5"><ImCross className="text-white text-8xl" /></span>
                </div>
                <h1 className="text-2xl">Error al confirmar email</h1>
                <Link href="/">
                    <button className="mt-10 w-full px-5 bg-red-800 hover:bg-red-900 text-white rounded-lg shadow-lg px-10 py-5">
                        Volver al inicio
                    </button>
                </Link>
            </div>
        </div>
        </>
    )
}

export default errorEmail