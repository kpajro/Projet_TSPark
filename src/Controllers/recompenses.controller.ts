import { RoleAuth } from "../Middlewares";
import { Accomplissement, Recompense, Roles } from "../Models";
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
        try {
            const recompense = req.body as Accomplissement
            const result = await this.recompenseService.assignRecompense(recompense)
            res.status(200).json({ message: "récompense attribuée", data: result })
        } catch (err) {
            res.status(400).json({ message: "error assignRecompense", error: err })
        }
    }

    buildRouter(): Router{
        const router = Router()

        router.post("/create-recompense", RoleAuth([Roles.admin]), this.createRecompense.bind(this))
        router.post("/assign-recompense", RoleAuth([Roles.admin]), this.assignRecompense.bind(this))

        return router
    }

}