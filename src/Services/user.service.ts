import { ConnectToDatabase } from "../Utils"
import { User } from "../Models"

export class UserService{
    async FindUsers(){
        const conn = await ConnectToDatabase()
        const [users] = await conn.query(
            "SELECT id, name, email, role_id, actif FROM users"
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

    async getLeaderboard(limit = 10) {
        const conn = await ConnectToDatabase()
        const sql = `SELECT id, name, points FROM users WHERE actif = 1 ORDER BY points DESC LIMIT ?`
        const [rows] = await conn.query(sql, [limit])

        return rows
    }

    async getActiveUsers(limit = 10) {
        if (limit <= 0) {
            throw new Error("limit invalide")
        }

        const conn = await ConnectToDatabase()
        const sql = `SELECT u.id, u.name, COUNT(p.id) AS completedDefis FROM users u JOIN participationdefi p ON p.user_id = u.id WHERE p.status = 'completed' GROUP BY u.id ORDER BY completedDefis DESC LIMIT ?`
        const [rows] = await conn.query(sql, [limit])

        return rows
    }
}