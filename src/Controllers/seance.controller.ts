import { Router, Request, Response } from "express"
import { SeanceService } from "../Services/seance.service"
import { Seance } from "../Models"

export class SeanceController{
    readonly seanceService: SeanceService

    constructor(seanceServ: SeanceService){
        this.seanceService = seanceServ
    }

    async addSession(req: Request, res: Response) {
        try {
            const seance = req.body as Seance
            await this.seanceService.addSession(seance)
            res.json("séance enregistrée")
        } catch (err) {
            res.status(400).json({ message: "error add session", error: err })
        }
    }
    async getProgression(req: Request, res: Response) {
        try {
            const userId = Number(req.params.userId)
            const defiId = Number(req.params.defiId)

            const progression = await this.seanceService.getProgression(userId, defiId)

            res.json(progression)
        } catch (err) {
            res.status(400).json({ message: "error progression", error: err })
        }
    }

    buildRouter(): Router {
        const router = Router()

        router.post("/add-session", this.addSession.bind(this))
        router.get("/progression/:userId/:defiId", this.getProgression.bind(this)
        )

        return router
    }

}