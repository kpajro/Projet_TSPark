import { RowDataPacket } from "mysql2/promise"
import { ConnectToDatabase } from "../Utils"
import { User } from "../Models"

type UserRow = User & RowDataPacket

export class UserService{
    async FindUsers(): Promise<User[]>{
        const conn = await ConnectToDatabase()
        const [users] = await conn.query<UserRow[]>(
            "SELECT id, name, role_id, actif FROM users"
        )
        return users
    }
    
    async ActiveUser(userIds: number[]){
        if (userIds.length === 0){
            return
        }
        const conn = await ConnectToDatabase()
        const temptable = userIds.map(() => "?").join(",")
        const sql = `UPDATE users SET actif = NOT actif WHERE id IN (${temptable})`

        await conn.query(sql, [userIds])
    }
}