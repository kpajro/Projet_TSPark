import { RoleAuth } from "../Middlewares";
import { Accomplissement, Recompense, Roles } from "../Models";
import { RecompensesService } from "../Services/recompenses.service";
import { Request, Response, Router} from "express"

export class RecompensesController{
    readonly recompensesService: RecompensesService

    constructor(recompenseServ: RecompensesService){
        this.recompensesService = recompenseServ
    }

    async createRecompense(req: Request, res: Response){
        try{
            const recomp = req.body as Recompense
            if (!recomp) {
                return res.status(400).json({ message: "Payload invalide" })
            }
            await this.recompensesService.createRecompense(recomp)
            res.status(201).json({ message: "Récompense créée" })
        }catch(err){
            res.status(500).json({message: "create recompense failed", error:err})
        }
    }

    async assignRecompense(req: Request, res: Response){
        try {
            const accomplissement = req.body as Accomplissement
            if (!accomplissement) {
                return res.status(400).json({ message: "Payload invalide" })
            }
            const result = await this.recompensesService.assignRecompense(accomplissement)
            res.status(200).json({ message: "récompense attribuée", data: result })
        } catch (err) {
            res.status(500).json({ message: "error assignRecompense", error: err })
        }
    }

    async getMyRecompenses(req: Request, res: Response) {
        try {
            const userId = Number(req.params.userId)
            if (isNaN(userId)) {
                return res.status(400).json({ message: "userId invalide" })
            }

            const rewards = await this.recompensesService.getUserRecompense(userId)
            res.status(200).json(rewards)
        } catch (err) {
            console.error("getMyRewards error:", err)
            res.status(500).json({ message: "Impossible de récupérer les récompenses" })
        }
    }

    buildRouter(): Router{
        const router = Router()

        router.post("/create-recompense", RoleAuth([Roles.admin]), this.createRecompense.bind(this))
        router.post("/assign-recompense", RoleAuth([Roles.admin]), this.assignRecompense.bind(this))
        router.get("/get-recompenses/:userId", RoleAuth([Roles.user]), this.getMyRecompenses.bind(this))
        return router
    }

}