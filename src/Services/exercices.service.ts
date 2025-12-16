import { ConnectToDatabase } from "../Utils"
import { Exercice } from "../Models"

export class ExerciceService{
    async createExercice(exercice: Exercice){
        const conn = await ConnectToDatabase()

        const sql = "INSERT INTO exercices (nom, description, complementaire) VALUES (?,?,?)"
        await conn.query(sql, [exercice.nom, exercice.description, exercice.complémentaire])
    }

    //@Rev:-> #ALL: refaire la requête en Patch (flemme pour l'instant)
    async modifyExercice(exercice: Exercice, exerciceid: number){
        const conn = await ConnectToDatabase()

        const sql = "UPDATE exercices SET nom=?, description=?, complementaire=? WHERE id=?"
        await conn.query(sql,[exercice.nom, exercice.description, exercice.complémentaire, exerciceid])
    }

    async deleteExercice(exerciceid: number){
        const conn = await ConnectToDatabase()

        const sql = "DELETE FROM exercices WHERE id=?"
        await conn.query(sql, [exerciceid])
    }

}