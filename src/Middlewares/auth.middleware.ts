import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { Roles } from "../Models/user.interface"

interface JwtPayload {
    id: number
    role: Roles
}

export function RoleAuth(roles: Roles[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(403).json({ message: "No token" })
        }

        const token = authHeader.split(" ")[1]
        if (!token) {
            return res.status(403).json({ message: "Invalid auth headers" })
        }

        try {
            const secret = process.env.JWT_SECRET || "default"
            const decoded = jwt.verify(token, secret) as JwtPayload

            req.user = decoded

            if (decoded.role === Roles.admin) {
                return next()
            }

            if (roles.includes(decoded.role)) {
                return next()
            }

            return res.status(403).json({ message: "Forbidden: permissions not elevated" })
        } catch (err) {
            return res.status(401).json({ message: "Unauthorized access | token is not valid" })
        }
    }
}

export function generateSessionToken(id: number, role: Roles) {
    const secret = process.env.JWT_SECRET || "default"

    const payload = {
        id: id,
        role: role
    }

    return jwt.sign(payload, secret, { expiresIn: "7d" })
}
