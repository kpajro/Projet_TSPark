import { Request } from "express"
import { Roles } from "../Models/user.interface"

interface JwtPayload {
    id: number
    role: Roles
}

declare module "express-serve-static-core" {
    interface Request {
        user?: JwtPayload
    }
}
