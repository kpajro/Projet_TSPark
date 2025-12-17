import { Router, Request, Response } from "express"
import { SeanceService } from "../Services/seance.service"
import { Roles, Seance } from "../Models"
import { RoleAuth } from "../Middlewares"

export class SeanceController{
    readonly seanceService: SeanceService

    constructor(seanceServ: SeanceService){
        this.seanceService = seanceServ
    }

    async addSession(req: Request, res: Response) {
        try {
            const seance = req.body as Seance
            await this.seanceService.addSession(seance)
            res.status(200).json("séance enregistrée")
        } catch (err) {
            res.status(400).json({ message: "error add session", error: err })
        }
    }
    async getProgression(req: Request, res: Response) {
        try {
            const userId = Number(req.params.userId)
            const defiId = Number(req.params.defiId)

            const progression = await this.seanceService.getProgression(userId, defiId)

            res.status(200).json(progression)
        } catch (err) {
            res.status(400).json({ message: "error progression", error: err })
        }
    }

    buildRouter(): Router {
        const router = Router()

        router.post("/add-session", RoleAuth([Roles.user]), this.addSession.bind(this))
        router.get("/progression/:userId/:defiId", RoleAuth([Roles.user]), this.getProgression.bind(this)
        )

        return router
    }

}