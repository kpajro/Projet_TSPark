import { Recompense } from "../Models";
import { RecompensesService } from "../Services/recompenses.service";
import { Request, Response, Router} from "express"

export class recompenseController{
    readonly recompenseService: RecompensesService

    constructor(recompenseServ: RecompensesService){
        this.recompenseService = recompenseServ
    }

    async createRecompense(req: Request, res: Response){
        try{
            const recomp = req.body as Recompense
            await this.recompenseService.createRecompense(recomp)
            res.status(200).json("creation de la récompense")
        }catch(err){
            res.status(400).json({message: "j", error:err})
        }
    }

    async assignRecompense(req: Request, res: Response){
        
    }

    buildRouter(): Router{
        const router = Router()

        router.post("/create-recompense", this.createRecompense.bind(this))

        return router
    }

}