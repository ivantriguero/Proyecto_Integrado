import AdminTemplate from "./Admintemplate"
import { motion } from "framer-motion"

const Admin = ({children}) => {
    return (
       <motion.div
       initial={{ opacity:0 }}
       animate={{ opacity:1 }}
       transition={{duration: 0.5 ,delay:0.1}}
       >
        <AdminTemplate>
            <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{duration: 1 }}
            exit={{ opacity:0 }}
            >
                <h1>Bienvenido administrador</h1>
            </motion.div>
        </AdminTemplate>
       </motion.div>
    )
}

export default Admin