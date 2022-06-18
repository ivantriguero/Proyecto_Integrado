import HomePage from "./HomePage"
import { useState } from "react"
import Cookies from 'js-cookie';
import { serverRuntimeConfig } from '../next.config'
import jwt from 'jsonwebtoken'
import { motion } from "framer-motion";
const Home =()=>{


  let tipoUsuario='';

  const [reload, setReload]=useState(false)


  let token = Cookies.get('accessToken')
    if(token==undefined||token==null){
        token=''
    }
      jwt.verify(token, serverRuntimeConfig.secret, async function(err, decoded){
        if(!err && decoded){
            tipoUsuario =decoded.tipoUsuario
        }
      })
      return (
    <motion.div
    initial={{opacity:0 }}
    animate={{opacity:1 }}
    transition={{duration: 1.5}}
    exit={{opacity:0 }}>
        <HomePage />
     
    </motion.div>
  )
}

export default Home