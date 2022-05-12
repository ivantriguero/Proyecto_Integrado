import HomePage from "./HomePage"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import Login from "./Login"
import Cookies from 'js-cookie';
import { serverRuntimeConfig } from '../next.config'
import jwt from 'jsonwebtoken'
import Admin from './admin'


const Home =()=>{
  let tipoUsuario='';

  const [reload, setReload]=useState(false)

  let token = Cookies.get('accessToken')
    if(token==undefined||token==null){
        token=''
    }
      jwt.verify(token, serverRuntimeConfig.secret, async function(err, decoded){
        if(!err && decoded){
            console.log(decoded)
            tipoUsuario =decoded.tipoUsuario
        }
      })
      
      const [showLogin, setShowLogin]=useState(false)

      return (
    <motion.div
    initial={{opacity:0 }}
    animate={{opacity:1 }}
    transition={{duration: 1.5}}
    exit={{opacity:0 }}>
    <AnimatePresence>
      {showLogin && (<Login reload={reload} setReload={setReload} showLogin={showLogin} setShowLogin={setShowLogin} />)}
    </AnimatePresence>
    <HomePage showLogin={showLogin} setShowLogin={setShowLogin} />
     
    </motion.div>
  )
}

export default Home