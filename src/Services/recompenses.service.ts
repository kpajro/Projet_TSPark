import { Recompense, Seance, Accomplissement } from "../Models";
import { ConnectToDatabase } from "../Utils";


export class RecompensesService{
    async createRecompense(recompense: Recompense){
        const conn = await ConnectToDatabase()

        const sql = "INSERT INTO salleentrainement (nom, type, points) VALUES (?,?,?)"
        await conn.query(sql, [recompense.nom, recompense.type, recompense.points])
    }

    async assignRecompense(accomplissement: Accomplissement){
        const conn = await ConnectToDatabase()

        const sql = "INSERT INTO accomplissement (user, recompense) VALUES (?, ?)"
    }
}