import { json, Request, Response, Router } from "express"
import { UserService } from "../Services"
import { RoleAuth } from "../Middlewares";
import { Roles } from "../Models";

export class UserController{
    readonly UserService: UserService;
    constructor(Userservice: UserService) {
        this.UserService = Userservice;
    }

    async GetUsers(req: Request, res: Response){
        const users = await this.UserService.FindUsers();
        res.json(users);
    }

    async ToggleUser(req: Request, res: Response){
        try {
            const { userIds } = req.body as { userIds: number[] }

            if (!Array.isArray(userIds) || userIds.length === 0) {
                return res.status(400).json({message: "userIds doit être un array et peuplé"})
            }

            await this.UserService.ActiveUser(userIds)
            res.json({ message: `Users updated: ${userIds}`})
        } catch (err) {
            res.status(400).json({message: "Toggle Users Request failed", error: err})
        }
    }

    async DeleteUsers(req: Request, res: Response){
        try {
            const { userIds } = req.body as { userIds: number[]}

            if (!Array.isArray(userIds) || userIds.length === 0){
                return res.status(400).json({message: "userIds doit être un array et peuplé"})
            }
            await this.UserService.DeleteUsers(userIds)
            res.json({message: `Users deleted: ${userIds}`})
        } catch(err){
            res.status(400).json({message: "Delete Users Request failed", error: err})
        }
    }

    buildRouter(): Router{
        const router = Router()

        router.get("/", RoleAuth([Roles.proprietaire]), this.GetUsers.bind(this))
        router.patch("/actif", this.ToggleUser.bind(this))
        router.delete("/delete-users", this.DeleteUsers.bind(this))
        return router
    }
}
