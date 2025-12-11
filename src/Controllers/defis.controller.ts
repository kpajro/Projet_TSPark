import { Request, Response, Router } from "express";
import { DefiService } from "../Services/defis.service";
import { Defis } from "../Models";

export class DefiController{
    readonly defiService: DefiService

    constructor(defiServ: DefiService){
        this.defiService = defiServ
    }

    async createDefi(req: Request, res: Response){
        try{
            const defi = req.body as Defis

            await this.defiService.createDefi(defi)
            res.status(200).json("defi crée")
        }catch (err){
            res.status(400).json({message: "", error:err})
        }
        
    }

    async inviteUser(req: Request, res: Response) {
        const { defiId, userId } = req.body
        await this.defiService.inviteUser(defiId, userId)
        res.json("Invitation envoyée")
    }

    async acceptDefi(req: Request, res: Response) {
        const { defiId, userId } = req.body
        await this.defiService.acceptDefi(defiId, userId)
        res.json("Défi accepté")
    }

    async completeDefi(req: Request, res: Response) {
        const { defiId, userId } = req.body
        await this.defiService.completeDefi(defiId, userId)
        res.json("Défi complété")
    }
    async getMyDefis(req: Request, res: Response) {
        const userId = Number(req.params.userId)
        const defis = await this.defiService.getUserSocialDefis(userId)
        res.json(defis)
    }

    async exploreDefis(req: Request, res: Response) {
        try {
            const difficulte = req.query.difficulte
                ? Number(req.query.difficulte)
                : undefined

            const type = req.query.type as string | undefined

            const duree = req.query.duree
                ? Number(req.query.duree)
                : undefined

            const defis = await this.defiService.exploreDefis(
                difficulte,
                type,
                duree
            )

            res.json(defis)
        } catch (err) {
            res.status(400).json({ message: "error explore defis", error: err })
        }
    }

    async shareDefi(req: Request, res: Response) {
        try {
            const { defiId, userIds } = req.body as {
                defiId: number
                userIds: number[]
            }

            await this.defiService.shareDefi(defiId, userIds)
            res.json("defi partagé")
        } catch (err) {
            res.status(400).json({ message: "error share defi", error: err })
        }
    }

    async proposeDefi(req: Request, res: Response) {
        try {
            const defi = req.body as Defis
            await this.defiService.proposeDefiForSalle(defi)
            res.json("defi proposé à la salle")
        } catch (err) {
            res.status(400).json({ message: "error propose defi", error: err })
        }
    }

    async approveDefi(req: Request, res: Response) {
        try {
            const defiId = Number(req.params.id)
            await this.defiService.approveDefi(defiId, 50)
            res.json("defi approuvé + score ajouté")
        } catch (err) {
            res.status(400).json({ message: "error approve defi", error: err })
        }
    }

    buildRouter(): Router{
        const router = Router()

        router.post("/create-defi", this.createDefi.bind(this))
        router.post("/invite", this.inviteUser.bind(this))
        router.post("/accept", this.acceptDefi.bind(this))
        router.post("/complete", this.completeDefi.bind(this))
        router.get("/user/:userId", this.getMyDefis.bind(this))
        router.get("/explore", this.exploreDefis.bind(this))
        return router
    }
}