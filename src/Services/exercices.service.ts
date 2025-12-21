import { ConnectToDatabase } from "../Utils"
import { Exercice } from "../Models"

export class ExerciceService{
    async createExercice(exercice: Exercice){
        if (!exercice.nom) {
            throw new Error("Nom requis")
        }
        const conn = await ConnectToDatabase()

        const sql = "INSERT INTO exercices (nom, description, complementaire) VALUES (?,?,?)"
        await conn.query(sql, [exercice.nom, exercice.description, exercice.complémentaire])
    }

    async modifyExercice(exerciceId: number, exercice: Partial<Exercice>) {
        if (!exerciceId || exerciceId <= 0) {
            throw new Error("exerciceId invalide")
        }

        const fields: string[] = []
        const params: any[] = []

        if (exercice.nom !== undefined) {
            fields.push("nom=?")
            params.push(exercice.nom)
        }

        if (exercice.description !== undefined) {
            fields.push("description=?")
            params.push(exercice.description)
        }

        if (exercice.complémentaire !== undefined) {
            fields.push("complementaire=?")
            params.push(exercice.complémentaire)
        }

        if (fields.length === 0) {
            throw new Error("Aucune donnée à modifier")
        }

        const conn = await ConnectToDatabase()

        const sql = `UPDATE exercices SET ${fields.join(", ")} WHERE id=?`
        params.push(exerciceId)

        const [result]: any = await conn.query(sql, params)

        if (result.affectedRows === 0) {
            throw new Error("Exercice introuvable")
        }
    }

    async deleteExercice(exerciceid: number){
        const conn = await ConnectToDatabase()

        const sql = "DELETE FROM exercices WHERE id=?"
        const [result]: any = await conn.query(sql, [exerciceid])
        if (result.affectedRows === 0) {
            throw new Error("Exercice introuvable")
        }
    }

}