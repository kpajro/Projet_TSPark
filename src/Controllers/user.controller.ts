import { json, Request, Response, Router } from "express"
import { UserService } from "../Services"
import { RoleAuth } from "../Middlewares";
import { Roles, User } from "../Models";

export class UserController{
    readonly UserService: UserService;
    constructor(Userservice: UserService) {
        this.UserService = Userservice;
    }

    async GetUsers(req: Request, res: Response) {
        try {
            const users = await this.UserService.FindUsers()
            res.status(200).json(users)
        } catch (err) {
            console.error(err)
            res.status(500).json({ message: "Erreur récupération utilisateurs" })
        }
    }

    async ToggleUser(req: Request, res: Response) {
        try {
            const { userIds } = req.body as { userIds: number[] }

            if (!Array.isArray(userIds) || userIds.length === 0) {
                return res.status(400).json({ message: "userIds doit être un array non vide" })
            }

            await this.UserService.ActiveUser(userIds)
            res.status(200).json({ message: "Utilisateurs mis à jour", userIds })
        } catch (err) {
            console.error(err)
            res.status(500).json({ message: "Erreur modification utilisateurs" })
        }
    }

    async DeleteUsers(req: Request, res: Response) {
        try {
            const { userIds } = req.body as { userIds: number[] }

            if (!Array.isArray(userIds) || userIds.length === 0) {
                return res.status(400).json({ message: "userIds doit être un array non vide" })
            }

            await this.UserService.DeleteUsers(userIds)
            res.status(200).json({ message: "Utilisateurs supprimés", userIds })
        } catch (err) {
            console.error(err)
            res.status(500).json({ message: "Erreur suppression utilisateurs" })
        }
    }

    async leaderboard(req: Request, res: Response) {
        try {
            const limit = req.query.limit ? Number(req.query.limit) : 10

            const leaderboard = await this.UserService.getLeaderboard(limit)
            res.status(200).json(leaderboard)
        } catch (err) {
            console.error("leaderboard error:", err)
            res.status(500).json({ message: "Impossible de récupérer le classement" })
        }
    }

    async mostActive(req: Request, res: Response) {
        try {
            const limit = req.query.limit ? Number(req.query.limit) : 10

            const activeUsers = await this.UserService.getActiveUsers(limit)
            res.status(200).json(activeUsers)
        } catch (err) {
            console.error("mostActive error:", err)
            res.status(500).json({ message: "Impossible de récupérer les utilisateurs actifs" })
        }
    }

    buildRouter(): Router{
        const router = Router()

        router.get("/", RoleAuth([Roles.admin]), this.GetUsers.bind(this))
        router.patch("/actif", RoleAuth([Roles.admin]),this.ToggleUser.bind(this))
        router.delete("/delete-users", RoleAuth([Roles.admin]), this.DeleteUsers.bind(this))
        router.get("/leaderboard", RoleAuth([Roles.admin, Roles.proprietaire, Roles.user]), this.leaderboard.bind(this))
        router.get("/most-active", RoleAuth([Roles.admin, Roles.proprietaire]), this.mostActive.bind(this))
        return router
    }
}
