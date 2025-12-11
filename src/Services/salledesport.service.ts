import { SalleDeSport } from "../Models";
import { ConnectToDatabase } from "../Utils";

export class SalleDeSportService{
    async getSallesDeSports() {
        const conn = await ConnectToDatabase()

        const sql = "SELECT nom, adresse, numtel, description, activites FROM salledesport"
        const [data] = await conn.query(sql)
        return data
    }

    async getLaSalleDeSport(salleid: number){
        const conn = await ConnectToDatabase()

        const sql = "SELECT nom, adresse, numtel, description, activites FROM salledesport WHERE id=?"
        const [data] = await conn.query(sql, [salleid])
        return data
    }
}