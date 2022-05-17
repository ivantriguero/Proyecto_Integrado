import '../styles/globals.css'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import $ from 'jquery';
import { useState } from 'react';

function MyApp({ Component, pageProps}) {

  const [showLogin, setShowLogin]=useState(false)

  const {pathname} = useRouter();
  return (
    <AnimatePresence exitBeforeEnter>
      {showLogin && (<Login reload={reload} setReload={setReload} showLogin={showLogin} setShowLogin={setShowLogin} />)}
      <Component showLogin={showLogin} setShowLogin={setShowLogin} key={pathname} {...pageProps} />
    </AnimatePresence>
    ) 
}

export default MyApp
