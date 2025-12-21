import { Recompense, Seance, Accomplissement } from "../Models";
import { ConnectToDatabase } from "../Utils";


export class RecompensesService{
    async createRecompense(recompense: Recompense){
        if (!recompense.nom || !recompense.type) {
            throw new Error("Récompense invalide")
        }
        const conn = await ConnectToDatabase()

        const sql = "INSERT INTO recompenses (nom, type, points) VALUES (?,?,?)"
        await conn.query(sql, [recompense.nom, recompense.type, recompense.points])
    }

    async assignRecompense(accomplissement: Accomplissement){
        const conn = await ConnectToDatabase()

        const sql = "INSERT INTO accomplissement (user_id, recompense_id) VALUES (?, ?)"
        const [result]: any = await conn.query(sql, [accomplissement.user.id, accomplissement.recompense.id])
        if (result.affectedRows === 0) {
            throw new Error("Récompense déjà attribuée")
        }
    }

    async getUserRecompense(userId: number) {
        const conn = await ConnectToDatabase()
        const sql = `SELECT r.id, r.nom, r.type, r.points FROM accomplissement a JOIN recompenses r ON r.id = a.recompense_id WHERE a.user_id = ?`
        const [rows] = await conn.query(sql, [userId])

        return rows
    }
}