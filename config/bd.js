import { createPool } from 'mysql2/promise'

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'Studium2022;',
    port: 3306,
    database: 'proyectointegrado'
})

export { pool }