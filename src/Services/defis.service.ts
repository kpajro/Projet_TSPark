import { Defis } from "../Models";
import { ConnectToDatabase } from "../Utils";

export class DefisService{
    async getUserDefi(diff: number){
        const conn = await ConnectToDatabase()

        const sql = "SELECT * FROM defis WHERE difficulte=?"
        await conn.query(sql, [diff])
    }

    async acceptDefi(defiId: number, userId: number) {
        const conn = await ConnectToDatabase()
        const sql = "UPDATE participationdefi SET status='accepted' WHERE defi_id=? AND user_id=?"
        await conn.query(sql, [defiId, userId])
    }

    async completeDefi(defiId: number, userId: number) {
        const conn = await ConnectToDatabase()
        const sql = "UPDATE participationdefi SET status='completed' WHERE defi_id=? AND user_id=?"
        await conn.query(sql, [defiId, userId])
    }

    async getUserSocialDefis(userId: number) {
        const conn = await ConnectToDatabase()
        const sql = "SELECT d.* FROM defis d JOIN participationdefi dp ON dp.defi_id=d.id WHERE dp.user_id=?"
        const [rows] = await conn.query(sql, [userId])
        return rows
    }

    async exploreDefis(difficulte?: number) {
        const conn = await ConnectToDatabase()
        let sql = "SELECT * FROM defis WHERE fin>=NOW()"
        const params: any[] = []

        if (difficulte !== undefined) {
            sql += " AND difficulte=?"
            params.push(difficulte)
        }

        const [rows] = await conn.query(sql, params)
        return rows
    }

    async approveDefi(defiId: number, points: number) {
        const conn = await ConnectToDatabase()
        await conn.query("UPDATE defis SET status='APPROUVE' WHERE id=?", [defiId])
        await conn.query("UPDATE users SET score=score+? WHERE id=(SELECT ByUser FROM defis WHERE id=?)", [points, defiId])
    }

    async createDefi(defis: Defis){
        const conn = await ConnectToDatabase()

        const sql = "INSERT INTO defis (nom, difficulte, recompense_id, objectifs, debut, fin) VALUES (?,?,?,?,?,?)"
        await conn.query(sql, [defis.nom, defis.difficulte, defis.recompense.id, JSON.stringify(defis.objectifs), defis.debut, defis.fin])
    }
}