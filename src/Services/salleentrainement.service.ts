import { ConnectToDatabase } from "../Utils"
import { SalleEntrainement } from "../Models"

export class SalleEntrainementService {
    async createSalle(salle: SalleEntrainement){
        const conn = await ConnectToDatabase()

        const sql = "INSERT INTO salleentrainement (nom, capacite, equipements, responsable_id, salle_de_sport_id) VALUES (?,?,?,?,?)"
        await conn.query(sql, [salle.nom, salle.capacite, JSON.stringify(salle.equipements), salle.responsable.id, salle.salledesport.id])
    }

    async approveSalle(salle: SalleEntrainement, salleid: number){
        const conn = await ConnectToDatabase()

        const sql = "UPDATE salleentrainement SET accepted=? WHERE id=?"
        const data = await conn.query(sql, [true, salleid])
        return data
    }

    //@Rev:-> #ALL: refaire la requête en Patch (flemme pour l'instant)
    async modifySalle(salle: SalleEntrainement, salleid: number){
        const conn = await ConnectToDatabase()

        const sql = "UPDATE salleentrainement SET nom=?, capacite=?, equipements=?, responsable_id=?, salle_de_sport_id=? WHERE id=?"
        await conn.query(sql,[salle.nom, salle.capacite, JSON.stringify(salle.equipements), salle.responsable.id, salle.salledesport.id, salleid])
    }

    async deleteSalle(salleid: number){
        const conn = await ConnectToDatabase()

        const sql = "DELETE FROM salleentrainement WHERE id=?"
        await conn.query(sql, [salleid])
    }
}