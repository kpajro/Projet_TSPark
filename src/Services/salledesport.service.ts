import { SalleDeSport } from "../Models";
import { ConnectToDatabase } from "../Utils";

export class SalleDeSportService{
    async getSallesDeSports() {
        const conn = await ConnectToDatabase()

        const sql = "SELECT id, nom, adresse, numtel, description, activites FROM salledesport"
        const [data] = await conn.query(sql)
        return data
    }

    async getLaSalleDeSport(salleid: number){
        const conn = await ConnectToDatabase()

        const sql = "SELECT nom, adresse, numtel, description, activites FROM salledesport WHERE id=?"
        const [data] = await conn.query(sql, [salleid])
        return data
    }

    async createSalle(salle: SalleDeSport){
        const conn = await ConnectToDatabase()

        const sql = "INSERT INTO salledesport (nom, capacite, equipements, responsable_id) VALUES (?,?,?,?)"
        await conn.query(sql, [salle.nom, salle.capacite, JSON.stringify(salle.equipements), salle.responsable])
    }
    
    async approveSalle(salleid: number){
        const conn = await ConnectToDatabase()

        const sql = "UPDATE salledesport SET accepted=? WHERE id=?"
        const data = await conn.query(sql, [1, salleid])
        return data
    }

    async modifySalle(salle: SalleDeSport, salleid: number){
        const conn = await ConnectToDatabase()

        const sql = "UPDATE salledesport SET nom=?, capacite=?, equipements=?, responsable_id=? WHERE id=?"
        await conn.query(sql,[salle.nom, salle.capacite, JSON.stringify(salle.equipements), salle.responsable, salleid])
    }

    async deleteSalle(salleid: number){
        const conn = await ConnectToDatabase()

        const sql = "DELETE FROM salledesport WHERE id=?"
        await conn.query(sql, [salleid])
    }
}