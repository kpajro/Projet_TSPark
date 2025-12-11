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
            res.status(400).json({message: "ede", error:err})
        }
    }

    async infoSalleDeSport(req: Request, res: Response){
        try{
            const salleid = Number(req.params.id)
            const out = await this.salleDeSportService.getLaSalleDeSport(salleid)
            res.status(200).json(out)
        }catch(err){
            res.status(400).json({message: "ede", error:err})
        }
    }

    buildRouter(): Router{
        const router = Router()

        router.get("/get-salle-info/:id", RoleAuth([Roles.admin]),this.infoSalleDeSport.bind(this))
        router.get("/getSalles", RoleAuth([Roles.user]), this.toutesLesSallesDeSport.bind(this))
        return router
    }
}