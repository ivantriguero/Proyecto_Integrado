import '../styles/globals.css'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import $ from 'jquery';

function MyApp({ Component, pageProps}) {
  const {pathname} = useRouter();
  return (
    <AnimatePresence exitBeforeEnter>
      <Component key={pathname} {...pageProps} />
    </AnimatePresence>
    ) 
}

export default MyApp
