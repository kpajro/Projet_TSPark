import { Request, Response, Router } from "express";
import { DefiService } from "../Services/defis.service";
import { Defis, Roles } from "../Models";
import { RoleAuth } from "../Middlewares";

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
            res.status(400).json({message: "error create défi", error:err})
        }
        
    }

    async inviteUser(req: Request, res: Response) {
        try {
            const { defiId, userId } = req.body
            await this.defiService.inviteUser(defiId, userId)
            res.json("Invitation envoyée")
        } catch (err) {
            res.status(400).json({ message: "error inviteUser", error: err })
        }
    }

    async acceptDefi(req: Request, res: Response) {
        try {
            const { defiId, userId } = req.body
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
            const type = req.query.type as string | undefined
            const duree = req.query.duree ? Number(req.query.duree) : undefined
            const defis = await this.defiService.exploreDefis( difficulte, type, duree)
            res.status(200).json(defis)
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
            res.status(200).json("defi partagé")
        } catch (err) {
            res.status(400).json({ message: "error share defi", error: err })
        }
    }

    async proposeDefi(req: Request, res: Response) {
        try {
            const defi = req.body as Defis
            await this.defiService.proposeDefiForSalle(defi)
            res.status(200).json("defi proposé à la salle")
        } catch (err) {
            res.status(400).json({ message: "error propose defi", error: err })
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
        router.post("/invite", RoleAuth([Roles.user]), this.inviteUser.bind(this))
        router.post("/accept", RoleAuth([Roles.user]), this.acceptDefi.bind(this))
        router.post("/complete", RoleAuth([Roles.user]), this.completeDefi.bind(this))
        router.post("/propose", RoleAuth([Roles.proprietaire]), this.proposeDefi.bind(this))
        router.post("/partager", RoleAuth([Roles.user]), this.shareDefi.bind(this))
        router.get("/user/:userId", RoleAuth([Roles.proprietaire, Roles.user]), this.getMyDefis.bind(this))
        router.get("/explore", RoleAuth([Roles.proprietaire, Roles.user]), this.exploreDefis.bind(this))
        return router
    }
}