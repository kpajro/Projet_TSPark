import { Defis } from "../Models";
import { ConnectToDatabase } from "../Utils";

export class DefiService{
    async getUserDefi(diff: number){
        const conn = await ConnectToDatabase()

        const sql = "SELECT * FROM defis WHERE difficulte=?"
        await conn.query(sql, [diff])
    }

    async shareDefi(defiId: number, userIds: number[]) {
        const conn = await ConnectToDatabase()

        const sql = "INSERT IGNORE INTO defi_participants (defi_id, user_id) VALUES (?, ?)"

        for (const userId of userIds) {
            await conn.query(sql, [defiId, userId])
        }
    }

    async inviteUser(defiId: number, userId: number) {
        const conn = await ConnectToDatabase()
        const sql = "INSERT IGNORE INTO participationdefi (defi_id, user_id, status) VALUES (?, ?, 'invite')"
        await conn.query(sql, [defiId, userId])
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

    async exploreDefis(difficulte?: number, type?: string, duree?: number) {
        const conn = await ConnectToDatabase()
        let sql = "SELECT * FROM defis WHERE fin>=NOW()"
        const params: any[] = []

        if (difficulte !== undefined) {
            sql += " AND difficulte=?"
            params.push(difficulte)
        }

        if (type !== undefined) {
            sql += " AND type_entrainement=?"
            params.push(type)
        }

        if (duree !== undefined) {
            sql += " AND duree<=?"
            params.push(duree)
        }

        const [rows] = await conn.query(sql, params)
        return rows
    }

    async proposeDefiForSalle(defi: Defis) {
        const conn = await ConnectToDatabase()
        const sql = "INSERT INTO defis (nom, difficulte, recompense_id, objectifs, exercices, byUser, debut, fin) VALUES (?, ?, ?, ?, ?, ?, ?, 'PROPOSE', ?, ?)"
        await conn.query(sql, [
            defi.nom,
            defi.difficulte,
            defi.recompense,
            JSON.stringify(defi.objectifs),
            JSON.stringify(defi.exercices),
            defi.byUser,
            defi.debut,
            defi.fin
        ])
    }

    async approveDefi(defiId: number, points: number) {
        const conn = await ConnectToDatabase()
        await conn.query("UPDATE defis SET status='APPROUVE' WHERE id=?", [defiId])
        await conn.query("UPDATE users SET score=score+? WHERE id=(SELECT proposed_by FROM defis WHERE id=?)", [points, defiId])
    }

    async createDefi(defis: Defis){
        const conn = await ConnectToDatabase()

        const sql = "INSERT INTO defis (nom, difficulte, recompense_id, seance_id, objectifs, debut, fin)"
        await conn.query(sql, [defis.nom, defis.difficulte, null, null, defis.objectifs, defis.debut, defis.fin])
    }
}