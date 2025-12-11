import { Seance } from "../Models"
import { ConnectToDatabase } from "../Utils"

export class SeanceService{
    async addSession(seance: Seance) {
    const conn = await ConnectToDatabase()
    const sql = "INSERT INTO suivi_defi (user_id, calories, date, temps) VALUES (?, ?, ?, ?, ?, NOW())"
    await conn.query(sql, [
        seance.user.id,
        seance.calories,
        seance.date,
        seance.temps])
}

async getProgression(userId: number, defiId: number) {
    const conn = await ConnectToDatabase()
    const sql = "SELECT calories, duree, progression, date FROM suivi_defi WHERE user_id=? AND defi_id=? ORDER BY date ASC"
    const [rows] = await conn.query(sql, [userId, defiId])
    return rows
}

}