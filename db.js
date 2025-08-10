// Irá ler todo o arquivo .env e irá guardar as informações em uma varável global
// do node chamada process.env
import 'dotenv/config'
import postgres from 'postgres'

const sql = postgres(process.env.DATABASE_URL, {
    ssl: {
        rejectUnauthorized: false // Necessário para o Neon.tech em ambientes de produção
    }
})

export { sql }