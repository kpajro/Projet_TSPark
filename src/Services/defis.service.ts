import { Defis } from "../Models";
import { ConnectToDatabase } from "../Utils";

export class DefisService{
    async acceptDefi(defiId: number, userId: number) {
        const conn = await ConnectToDatabase()
        const sql = "UPDATE participationdefi SET status='accepted' WHERE defi_id=? AND user_id=?"
        const [result]: any = await conn.query(sql, [defiId, userId])
        if (result.affectedRows === 0) {
            throw new Error("Participation inexistante")
        }
    }

    async updateDefi(defiId: number, defis: Partial<Defis>) {
        if (!defiId || defiId <= 0) {
            throw new Error("defiId invalide")
        }

        const infos: string[] = []
        const params: any[] = []

        if (defis.nom !== undefined) {
            infos.push("nom=?")
            params.push(defis.nom)
        }

        if (defis.difficulte !== undefined) {
            infos.push("difficulte=?")
            params.push(defis.difficulte)
        }

        if (defis.recompense?.id !== undefined) {
            infos.push("recompense_id=?")
            params.push(defis.recompense?.id)
        }

        if (defis.objectifs !== undefined) {
            infos.push("objectifs=?")
            params.push(JSON.stringify(defis.objectifs))
        }

        if (defis.debut !== undefined) {
            infos.push("debut=?")
            params.push(defis.debut)
        }

        if (defis.fin !== undefined) {
            infos.push("fin=?")
            params.push(defis.fin)
        }

        if (infos.length === 0) {
            throw new Error("Aucune donnée à modifier")
        }

        const conn = await ConnectToDatabase()

        const sql = `UPDATE defis SET ${infos.join(", ")} WHERE id=?`
        params.push(defiId)

        const [result]: any = await conn.query(sql, params)

        if (result.affectedRows === 0) {
            throw new Error("Défi introuvable")
        }
    }

    async completeDefi(defiId: number, userId: number) {
        const conn = await ConnectToDatabase()
        const sql = "UPDATE participationdefi SET status='completed' WHERE defi_id=? AND user_id=?"
        const [result]: any = await conn.query(sql, [defiId, userId])
        if (result.affectedRows === 0) {
            throw new Error("Impossible de compléter le défi")
        }
    }

    async getUserSocialDefis(userId: number) {
        const conn = await ConnectToDatabase()
        const sql = "SELECT d.* FROM defis d JOIN participationdefi dp ON dp.defi_id=d.id WHERE dp.user_id=?"
        const [rows]: any = await conn.query(sql, [userId])
        return rows
    }

    async exploreDefis(difficulte?: number, exerciceId?: number) {
        const conn = await ConnectToDatabase()
        let sql = "SELECT DISTINCT d.* FROM defis d LEFT JOIN defis_exercices de ON de.defi_id = d.id LEFT JOIN exercices e ON e.id = de.exercice_id WHERE d.fin >= NOW()"
        const params: any[] = []

        if (difficulte !== undefined) {
            sql += " AND difficulte=?"
            params.push(difficulte)
        }

        if (exerciceId !== undefined) {
            sql += " AND e.id = ?"
            params.push(exerciceId)
        }

        const [rows] = await conn.query(sql, params)
        return rows
    }

    async approveDefi(defiId: number) {
        const conn = await ConnectToDatabase()
        try {
            const [[defi]]: any = await conn.query(
                "SELECT recompense_id FROM defis WHERE id=?",
                [defiId]
            )

            if (!defi || !defi.recompense_id) {
                throw new Error("Défi inexistant ou sans récompense")
            }

            const [[recompense]]: any = await conn.query(
                "SELECT points FROM recompenses WHERE id=?",
                [defi.recompense_id]
            )

            const [users]: any = await conn.query(
                `SELECT DISTINCT user_id 
                FROM participationdefi 
                WHERE defi_id=? AND status='completed'`,
                [defiId]
            )

            if (users.length === 0) {
                throw new Error("Aucun utilisateur à récompenser")
            }

            for (const u of users) {
                await conn.query(
                    "UPDATE users SET points = points + ? WHERE id=?",
                    [recompense.points, u.user_id]
                )

                await conn.query(
                    `INSERT IGNORE INTO accomplissement (user_id, recompense_id)
                    VALUES (?, ?)`,
                    [u.user_id, defi.recompense_id]
                )
            }
        } catch (err) {
            throw err
        }
    }

    async createDefi(defis: Defis){
        const conn = await ConnectToDatabase()
        if (!defis.nom || !defis.difficulte || !defis.debut || !defis.fin) {
            throw new Error("Données du défi invalides")
        }
        const sql = "INSERT INTO defis (nom, difficulte, recompense_id, objectifs, byUser, debut, fin) VALUES (?,?,?,?,?,?,?)"
        await conn.query(sql, [defis.nom, defis.difficulte, defis.recompense.id, JSON.stringify(defis.objectifs), defis.byUser, defis.debut, defis.fin])
    }
}