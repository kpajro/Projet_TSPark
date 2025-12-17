import { Recompense, Seance, Accomplissement } from "../Models";
import { ConnectToDatabase } from "../Utils";


export class RecompensesService{
    async createRecompense(recompense: Recompense){
        const conn = await ConnectToDatabase()

        const sql = "INSERT INTO recompenses (nom, type, points) VALUES (?,?,?)"
        await conn.query(sql, [recompense.nom, recompense.type, recompense.points])
    }

    async assignRecompense(accomplissement: Accomplissement){
        const conn = await ConnectToDatabase()

        try {
            const sql = "INSERT INTO accomplissement (user_id, recompense_id) VALUES (?, ?)"
            await conn.query(sql, [accomplissement.user.id, accomplissement.recompense.id])
        } catch (err) {
            console.error("Erreur assignRecompense", err)
            throw err
        }
    }
}