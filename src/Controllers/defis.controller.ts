import { Request, Response, Router } from "express";
import { DefisService } from "../Services/defis.service";
import { Defis, Roles } from "../Models";
import { RoleAuth } from "../Middlewares";

export class DefisController{
    readonly defiService: DefisService

    constructor(defiServ: DefisService){
        this.defiService = defiServ
    }

    async createDefi(req: Request, res: Response){
        try{
            const defi = req.body as Defis

            await this.defiService.createDefi(defi)
            res.status(200).json("defi crée")
        }catch (err){
            res.status(400).json({message: "error create défi", error:err})
        }
        
    }

    async acceptDefi(req: Request, res: Response) {
        try {
            const { defiId, userId} = req.body
            await this.defiService.acceptDefi(defiId, userId)
            res.json("Défi accepté")
        } catch (err) {
            res.status(400).json({ message: "error acceptDefi", error: err })
        }
    }

    async completeDefi(req: Request, res: Response) {
        try {
            const { defiId, userId } = req.body
            await this.defiService.completeDefi(defiId, userId)
            res.status(200).json("Défi complété")
        } catch (err) {
            res.status(400).json({ message: "error completeDefi", error: err })
        }
    }

    async getMyDefis(req: Request, res: Response) {
        try {
            const userId = Number(req.params.userId)
            const defis = await this.defiService.getUserSocialDefis(userId)
            res.status(200).json(defis)
        } catch (err) {
            res.status(400).json({ message: "error getMyDefis", error: err })
        }
    }

    async exploreDefis(req: Request, res: Response) {
        try {
            const difficulte = req.query.difficulte ? Number(req.query.difficulte) : undefined
            const defis = await this.defiService.exploreDefis( difficulte)
            res.status(200).json(defis)
        } catch (err) {
            res.status(400).json({ message: "error explore defis", error: err })
        }
    }

    async approveDefi(req: Request, res: Response) {
        try {
            const defiId = Number(req.params.id)
            await this.defiService.approveDefi(defiId, 50)
            res.status(200).json("defi approuvé + score ajouté")
        } catch (err) {
            res.status(400).json({ message: "error approve defi", error: err })
        }
    }

    buildRouter(): Router{
        const router = Router()

        router.post("/create-defi", RoleAuth([Roles.proprietaire, Roles.user]), this.createDefi.bind(this))
        router.post("/accept", RoleAuth([Roles.user]), this.acceptDefi.bind(this))
        router.post("/complete", RoleAuth([Roles.user]), this.completeDefi.bind(this))
        router.get("/user/:userId", RoleAuth([Roles.proprietaire, Roles.user]), this.getMyDefis.bind(this))
        router.get("/explore", RoleAuth([Roles.proprietaire, Roles.user]), this.exploreDefis.bind(this))
        return router
    }
}