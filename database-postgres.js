import { randomUUID } from "node:crypto"
import { sql } from './db.js'

// Banco de dados em memória
export class DatabasePostgres {
    async list(search) {
        let videos

        // Ambas as operações são assincronas, ou seja, são ações que vão 
        // executar mas que levam um tempo para finalizar (ex: 100ms)

        if (search) {
            // ilike serve para desconsiderar caixa alta da caixa baixa.
            // "%palavra%" desconsidera se a palavra está no começo, no final, 
            // ou no meio 
            videos = await sql`select * from videos where title ilike ${"%" + search + "%"}`
        } else {
            videos = await sql`select * from videos`
        }

        return videos
    }

    async create(video) {
        const videoId = randomUUID()

        const { title, description, duration } = video

        await sql`insert into videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`
    }

    async update(id, video) {
        const { title, description, duration } = video

        await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`
    }

    async delete(id) {
        await sql`delete from videos where id = ${id}`
    }
}