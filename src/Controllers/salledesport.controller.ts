import { Router, Request, Response } from "express"
import { SalleDeSportService } from "../Services/salledesport.service"
import { SalleDeSport } from "../Models"
import { RoleAuth } from "../Middlewares"
import { Roles } from "../Models"

export class SalleDeSportController{
    readonly salleDeSportService: SalleDeSportService

    constructor(salleDeSportServ: SalleDeSportService){
        this.salleDeSportService = salleDeSportServ
    }

    async toutesLesSallesDeSport(req: Request, res: Response){
        try{
            const out = await this.salleDeSportService.getSallesDeSports()
            res.status(200).json(out)
        }catch(err){
            res.status(500).json({message: "ede", error:err})
        }
    }

    async infoSalleDeSport(req: Request, res: Response){
        try{
            const salleid = Number(req.params.id)
            if (isNaN(salleid)) {
                return res.status(400).json({ message: "id invalide" })
            }
            const out = await this.salleDeSportService.getLaSalleDeSport(salleid)
            res.status(200).json(out)
        }catch(err){
            res.status(500).json({message: "erreur récupération", error:err})
        }
    }

    async newSalle(req: Request, res: Response){
            try {
                const salle = req.body as SalleDeSport
                await this.salleDeSportService.createSalle(salle)
                if (!salle) {
                    return res.status(400).json({ message: "Payload invalide" })
                }
                res.status(200).json("nouvelle salle ajoutée")
            } catch (err) {
                console.error("createSalle error:", err)
                res.status(400).json({ message: "Erreur création salle", error: err })
            }
        }
    
        async approveSalle(req: Request, res: Response){
            try {
                const salleid = Number(req.params.id)
                if (isNaN(salleid)) {
                    return res.status(400).json({ message: "id invalide" })
                }
                const out = await this.salleDeSportService.approveSalle(salleid)
                if(!out){
                    return res.status(400).json({message: "n'a pas pu accepter, salle existe pas"})
                }
                res.status(200).json(`Salle ${salleid} approuvée!`)
            }catch(err){
                res.status(400).json({message: "pas pu accepter ", error: err})
            }
        }
    
        async modifySalle(req: Request, res: Response){
            try {
                const salle = req.body as SalleDeSport
                const salleid = Number(req.params.id)
                await this.salleDeSportService.modifySalle(salleid, salle)
                res.status(200).json(`modification de la salle: ${salleid}`)
            } catch(err){
                console.error("modifySalle error:", err)
                res.status(400).json({message: "Could not modify Salle", error: err})
            }
        }
    
        async delSalle(req: Request, res: Response){
            try{
                const salleid = Number(req.params.id)
                await this.salleDeSportService.deleteSalle(salleid)
                res.status(200).json("salle supprimée")
            } catch (err){
                console.error("deleteSalle error:", err)
                res.status(400).json({message: "Could not delete Salle", error: err})
            }
        }

    buildRouter(): Router{
        const router = Router()

        router.get("/get-salle-info/:id", RoleAuth([Roles.proprietaire, Roles.user]),this.infoSalleDeSport.bind(this))
        router.get("/getSalles", RoleAuth([Roles.proprietaire, Roles.user]), this.toutesLesSallesDeSport.bind(this))
        router.post("/create-salle", RoleAuth([Roles.proprietaire]), this.newSalle.bind(this))
        router.post("/approve-salle/:id", RoleAuth([Roles.admin]), this.approveSalle.bind(this))
        router.put("/modify-salle/:id", RoleAuth([Roles.admin]), this.modifySalle.bind(this))
        router.delete("/delete-salle/:id", RoleAuth([Roles.admin]), this.delSalle.bind(this))
        return router
    }
}