import { RowDataPacket } from "mysql2/promise"
import { ConnectToDatabase } from "../Utils"

export class UserService{
    async FindUsers(){
        const conn = await ConnectToDatabase()
        const [users] = await conn.query(
            "SELECT id, name, role_id, actif FROM users"
        )
        return users
    }
    
    async ActiveUser(userIds: number[]){
        if (userIds.length === 0){
            return
        }
        const conn = await ConnectToDatabase()
        const temptable = userIds
        const sql = `UPDATE users SET actif = NOT actif WHERE id IN (${temptable})`

        await conn.query(sql, [userIds])
    }

    async DeleteUsers(userIds: number[]){
        if (userIds.length === 0){
            return
        }
        const conn = await ConnectToDatabase()
        const temptable = userIds
        const sql = `DELETE FROM users WHERE id IN (${temptable})`
        await conn.query(sql, [userIds])
    }
}