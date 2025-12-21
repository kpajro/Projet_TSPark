import { Seance } from "../Models"
import { ConnectToDatabase } from "../Utils"

export class SeanceService{
    async addSession(seance: Seance) {
        if (!seance.user?.id) {
            throw new Error("Utilisateur requis")
        }
        const conn = await ConnectToDatabase()
        const sql = "INSERT INTO seances (user_id, calories, date, temps) VALUES (?, ?, ?, ?)"
        await conn.query(sql, [seance.user.id, seance.calories, seance.date, seance.temps])
    }

    async getProgression(userId: number, defiId: number) {
        const conn = await ConnectToDatabase()
        const sql = `SELECT COUNT(*) as 'Nb Seances', SUM(s.calories) as 'Calories', SUM(s.temps) as 'Temps' FROM participationdefi p INNER JOIN seances s ON p.seance_id = s.id WHERE defi_id=? AND p.user_id=?`
        const [rows] = await conn.query(sql, [defiId, userId])
        return rows
    }
}