/*import { Request, Response, NextFunction } from "express"
import { Roles } from "../Models/user.interface"

export function RoleAuth(roles: Roles[]) {
    return (req: Request, res: Response, next: NextFunction) =>{
        const header = req.headers.authorization
        if(!header){
            return res.status(403).json({ message: "No token provided"})
        }
        const token = header.split(" ")[1]
        
        if(!token){
            return res.status(403).json({ message: "Invalid auth headers"})
        }

        try {
            const decoded = undefined// verif jwt avec jwt.verify
            req.user = decoded
            if(decoded.role === Roles.admin){
                return next()
            }

            if(roles.includes(decoded.role)){
                return next()
            }
            return res.status(403).json({message: "Forbidden: permissions not elevated"})
        } catch(err) {
            return res.status(401).json({message: "Unauthorized access | token is not valid"})
        }
    }
}*/