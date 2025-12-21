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
            if (!defi) {
                return res.status(400).json({ message: "Payload invalide" })
            }
            await this.defiService.createDefi(defi)
            res.status(201).json("defi crée")
        }catch (err){
            res.status(500).json({message: "error create défi", error:err})
        }
        
    }

    async updateDefi(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            await this.defiService.updateDefi(id, req.body)
            res.status(200).json({ message: "Defi modifié" })
        } catch (err: any) {
            console.error("updateExercice error:", err)
            res.status(400).json({ message: err.message })
        }
    }

    async acceptDefi(req: Request, res: Response) {
        try {
            const { defiId, userId} = req.body
            if (!defiId || !userId){
                return res.status(400).json({ message: "defiId et userId requis" })
            }
            await this.defiService.acceptDefi(defiId, userId)
            res.status(200).json({ message: "Défi accepté" })
        } catch (err) {
            res.status(500).json({ message: "error acceptDefi", error: err })
        }
    }

    async completeDefi(req: Request, res: Response) {
        try {
            const { defiId, userId } = req.body
            await this.defiService.completeDefi(defiId, userId)
            res.status(200).json("Défi complété")
        } catch (err) {
            res.status(500).json({ message: "Erreur lors de la complétion du défi", error: err })
        }
    }

    async getMyDefis(req: Request, res: Response) {
        try {
            const userId = Number(req.params.userId)
            if (isNaN(userId)) {
                return res.status(400).json({ message: "userId invalide" })
            }
            const defis = await this.defiService.getUserSocialDefis(userId)
            res.status(200).json(defis)
        } catch (err) {
            res.status(500).json({ message: "Erreur lors de la récupération des défis", error: err })
        }
    }

    async exploreDefis(req: Request, res: Response) {
        try {
            const difficulte = req.body.difficulte ? Number(req.body.difficulte) : undefined
            const exerciceId = req.body.exerciceId ? Number(req.body.exerciceId) : undefined
            const defis = await this.defiService.exploreDefis( difficulte, exerciceId)
            res.status(200).json(defis)
        } catch (err) {
            res.status(500).json({ message: "error explore defis", error: err })
        }
    }

    async approveDefi(req: Request, res: Response) {
        try {
            const defiId = Number(req.params.id)
            if (isNaN(defiId)) {
                return res.status(400).json({ message: "defiId invalide" })
            }
            await this.defiService.approveDefi(defiId)
            res.status(200).json("defi approuvé + score ajouté")
        } catch (err) {
            console.error(err)
            res.status(500).json({ message: "error approve defi", error: err })
        }
    }

    buildRouter(): Router{
        const router = Router()

        router.post("/create-defi", RoleAuth([Roles.proprietaire, Roles.user]), this.createDefi.bind(this))
        router.post("/accept", RoleAuth([Roles.user]), this.acceptDefi.bind(this))
        router.post("/complete", RoleAuth([Roles.user]), this.completeDefi.bind(this))
        router.put("/update/:id", RoleAuth([Roles.admin, Roles.proprietaire]), this.updateDefi.bind(this))
        router.post("/approve/:id", RoleAuth([Roles.admin, Roles.proprietaire]), this.approveDefi.bind(this))
        router.get("/user/:userId", RoleAuth([Roles.proprietaire, Roles.user]), this.getMyDefis.bind(this))
        router.get("/explore", RoleAuth([Roles.proprietaire, Roles.user]), this.exploreDefis.bind(this))
        return router
    }
}