import { json, Request, Response, Router } from "express"
import { UserService } from "../Services"
import { RoleAuth } from "../Middlewares";
import { Roles, User } from "../Models";

export class UserController{
    readonly UserService: UserService;
    constructor(Userservice: UserService) {
        this.UserService = Userservice;
    }

    async GetUsers(req: Request, res: Response){
        const users = await this.UserService.FindUsers();
        res.status(200).json(users);
    }

    async ToggleUser(req: Request, res: Response){
        try {
            const { userIds } = req.body as { userIds: number[] }

            if (!Array.isArray(userIds) || userIds.length === 0) {
                return res.status(400).json({message: "userIds doit être un array et peuplé"})
            }

            await this.UserService.ActiveUser(userIds)
            res.status(200).json({ message: `Users updated: ${userIds}`})
        } catch (err) {
            res.status(400).json({message: "Toggle Users Request failed", error: err})
        }
    }

    async CreateUser(req: Request, res: Response){
        try {
            const user = req.body as User
            await this.UserService.CreateUser(user)
            res.status(200).json({message: `Users created: ${user.id}`})
        } catch(err){
            res.status(400).json({message: "Create User failed", error: err})
        }
    }

    async DeleteUsers(req: Request, res: Response){
        try {
            const { userIds } = req.body as { userIds: number[]}

            if (!Array.isArray(userIds) || userIds.length === 0){
                return res.status(400).json({message: "userIds doit être un array et peuplé"})
            }
            await this.UserService.DeleteUsers(userIds)
            res.status(200).json({message: `Users deleted: ${userIds}`})
        } catch(err){
            res.status(400).json({message: "Delete Users Request failed", error: err})
        }
    }

    buildRouter(): Router{
        const router = Router()

        router.get("/", RoleAuth([Roles.admin]), this.GetUsers.bind(this))
        router.patch("/actif", RoleAuth([Roles.admin]),this.ToggleUser.bind(this))
        router.post("/create-user", RoleAuth([Roles.user]), this.CreateUser.bind(this))
        router.delete("/delete-users", RoleAuth([Roles.admin]), this.DeleteUsers.bind(this))
        return router
    }
}
