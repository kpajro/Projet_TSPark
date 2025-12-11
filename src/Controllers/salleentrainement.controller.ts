import { Request, Response, Router } from "express"
import { SalleEntrainement } from "../Models"
import { SalleEntrainementService } from "../Services"

export class SalleEntrainementController{
    readonly salleEntrainementService: SalleEntrainementService

    constructor(salleEntrainementServ: SalleEntrainementService){
        this.salleEntrainementService = salleEntrainementServ
    }

    async newSalle(req: Request, res: Response){
        try {
            const salle = req.body as SalleEntrainement
            await this.salleEntrainementService.createSalle(salle)

            res.json("nouvelle salle ajoutée")
        } catch (err) {
            console.error("createSalle error:", err)
            res.status(400).json({ message: "not gud", error: err })
        }
    }

    async approveSalle(req: Request, res: Response){
        try {
            const salle = req.body as SalleEntrainement
            const salleid = Number(req.body.params)
            const out = await this.salleEntrainementService.approveSalle(salle, salleid)
            if(!out){
                return res.status(400).json({message: "n'a pas pu accepter, salle existe pas"})
            }
            res.json(`Salle ${salleid} approuvée!`)
        }catch(err){
            res.status(400).json({message: "pas pu accepter ", error: err})
        }
    }

    async modifySalle(req: Request, res: Response){
        try {
            const salle = req.body as SalleEntrainement
            const salleid = Number(req.params.id)
            await this.salleEntrainementService.modifySalle(salle, salleid)
            res.json(`modification de la salle: ${salleid}`)
        } catch(err){
            console.error("modifySalle error:", err)
            res.status(400).json({message: "not uhmmm...", error: err})
        }
    }

    async delSalle(req: Request, res: Response){
        try{
            const salleid = Number(req.params.id)
            await this.salleEntrainementService.deleteSalle(salleid)
            res.json("salle supprimée")
        } catch (err){
            console.error("deleteSalle error:", err)
            res.status(400).json({message: "not bad?", error: err})
        }
    }

    buildRouter(): Router{
        const router = Router()

        router.post("/create-salle", this.newSalle.bind(this))
        router.put("/modify-salle/:id", this.modifySalle.bind(this))
        router.delete("/delete-salle/:id", this.delSalle.bind(this))
        return router
    }
}