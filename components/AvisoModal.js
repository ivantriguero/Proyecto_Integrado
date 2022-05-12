import {AiOutlineClose} from 'react-icons/ai'
import { useSpring, animated } from 'react-spring'
import {AiFillCheckCircle} from 'react-icons/ai'

const AvisoModal = ({ showModal, setShowModal, mensaje }) => {
    
    const openAvisoModal = () => {
        setShowModal(prev => !prev)
    }

    const animation = useSpring({
        config: {
            duration: 250
        },
        opacity: showModal ? 1 : 0,
        transform: showModal ? 'translateY(0%)' : 'translateY(-100%)'
    })


    return(
        <>
        {showModal ?
            <div className="z-20 fixed w-full flex justify-center">
                <animated.div style={animation} className="w-1/2 z-20 fixed top-5 bg-green-500 flex justify-between px-5 py-3 rounded-lg">
                    <div>
                        <h1 className="flex justify-center items-center"><AiFillCheckCircle className="mx-3 text-xl" />{mensaje}</h1>
                    </div>
                    <button onClick={openAvisoModal} className='text-2xl'>
                        <AiOutlineClose />
                    </button>
                </animated.div>
            </div>

            :null}

        </>
    )
}

export default AvisoModal