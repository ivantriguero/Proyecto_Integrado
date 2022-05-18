import {AiOutlineClose} from 'react-icons/ai'
import { useSpring, animated } from 'react-spring'

const Modal = ({className, children, showModal, setShowModal}) => {
    
    const openModal = () => {
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
            <div className="w-full h-screen bg-slate-900/50 fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center z-20">            
                    <animated.div className={className} style={animation}>
                        <div className="relative bg-white rounded-xl shadow-lg flex flex-col justify-center items-center">
                            <button onClick={openModal} className='absolute top-5 right-5 text-2xl'>
                                <AiOutlineClose />
                            </button>
                            {children}
                        </div>
                    </animated.div>
            </div>
            :null}

        </>
    )
}

export default Modal