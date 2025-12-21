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

        const sql = "INSERT INTO salledesport (nom, capacite, equipements, responsable_id, adresse, numtel, description, activites) VALUES (?,?,?,?,?,?,?,?)"
        await conn.query(sql, [salle.nom, salle.capacite, JSON.stringify(salle.equipements), salle.responsable, salle.adresse, salle.numtel, salle.description, JSON.stringify(salle.activites)])
    }
    
    async approveSalle(salleid: number){
        const conn = await ConnectToDatabase()

        const sql = "UPDATE salledesport SET accepted=? WHERE id=?"
        const [result]: any = await conn.query(sql, [1, salleid])
        if (result.affectedRows === 0) {
            throw new Error("Salle inexistante")
        }
        return true
    }

    async modifySalle(salleId: number, salle: Partial<SalleDeSport>) {
        if (!salleId || salleId <= 0) {
            throw new Error("salleId invalide")
        }

        const fields: string[] = []
        const params: any[] = []

        if (salle.nom !== undefined) {
            fields.push("nom=?")
            params.push(salle.nom)
        }

        if (salle.capacite !== undefined) {
            fields.push("capacite=?")
            params.push(salle.capacite)
        }

        if (salle.equipements !== undefined) {
            fields.push("equipements=?")
            params.push(JSON.stringify(salle.equipements))
        }

        if (salle.responsable !== undefined) {
            fields.push("responsable_id=?")
            params.push(salle.responsable)
        }

        if (salle.description !== undefined) {
            fields.push("description=?")
            params.push(salle.description)
        }

        if (salle.adresse !== undefined) {
            fields.push("adresse=?")
            params.push(salle.adresse)
        }

        if (salle.numtel !== undefined) {
            fields.push("numtel=?")
            params.push(salle.numtel)
        }

        if (salle.activites !== undefined) {
            fields.push("activites=?")
            params.push(JSON.stringify(salle.activites))
        }

        if (fields.length === 0) {
            throw new Error("Aucune donnée a modifier")
        }

        const conn = await ConnectToDatabase()

        const sql = `UPDATE salledesport SET ${fields.join(", ")} WHERE id=?`
        params.push(salleId)

        const [result]: any = await conn.query(sql, params)

        if (result.affectedRows === 0) {
            throw new Error("Salle introuvable")
        }
    }

    async deleteSalle(salleid: number){
        const conn = await ConnectToDatabase()

        const sql = "DELETE FROM salledesport WHERE id=?"
        await conn.query(sql, [salleid])
    }
}