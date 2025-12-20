import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ConnectToDatabase } from '../Utils/database'
import { Roles, User } from '../Models/user.interface'

export class AuthService {

    async registerUser(user: User) {
        const conn = await ConnectToDatabase()

        const checksql = 'SELECT id FROM users WHERE email = ?'
        const [existing]: any = await conn.query(checksql, [user.email])

        if (existing.length) {
            throw new Error('EMAIL_EXISTS')
        }

        const hashedPassword = await bcrypt.hash(user.password, 10)
        const sql = `INSERT INTO users (name, email, password, role_id, actif, points) VALUES (?, ?, ?, ?, 1, 0)`
        await conn.query(sql, [user.name, user.email, hashedPassword, 1])
    }

    async loginUser(email: string, password: string) {
        const conn = await ConnectToDatabase()
        const checksql = 'SELECT id, name, role_id, actif, points, password FROM users WHERE email = ? LIMIT 1'
        const [rows]: any = await conn.query(checksql, [email])

        if (!rows.length) {
            throw new Error('INVALID_CREDENTIALS')
        }

        const user = rows[0]
        console.log(user)

        if (!user.actif) {
            throw new Error('USER_INACTIVE')
        }

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) {
            throw new Error('INVALID_CREDENTIALS')
        }

        const payload = {
          id: user.id,
          role: user.role_id
        }

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET!,
            { expiresIn: '7d' }
        )

    return {
        token,
            user: {
                id: user.id,
                name: user.name,
                role: user.role_id,
                actif: user.actif,
                points: user.points
            }
        }
    }
}
