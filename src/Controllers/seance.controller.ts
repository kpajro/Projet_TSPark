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
        if (!seance) {
            return res.status(400).json({ message: "Payload invalide" })
        }

        await this.seanceService.addSession(seance)
        res.status(201).json({ message: "Séance enregistrée" })
        } catch (err) {
            console.error(err)
            res.status(500).json({ message: "Erreur ajout séance" })
        }
    }

    async getProgression(req: Request, res: Response) {
        try {
            const userId = Number(req.params.userId)
            const defiId = Number(req.params.defiId)

            if (isNaN(userId) || isNaN(defiId)) {
                return res.status(400).json({ message: "Paramètres invalides" })
            }

            const progression = await this.seanceService.getProgression(userId, defiId)
            res.status(200).json(progression)
        } catch (err) {
            console.error(err)
            res.status(500).json({ message: "Erreur récupération progression" })
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