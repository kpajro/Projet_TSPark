import { Request, Response, Router } from "express"
import { Exercice, Roles } from "../Models"
import { ExerciceService } from "../Services"
import { RoleAuth } from "../Middlewares"

export class ExerciceController{
    readonly exerciceService: ExerciceService

    constructor(exerciceServ: ExerciceService){
        this.exerciceService = exerciceServ
    }

    async newExercice(req: Request, res: Response){
        try {
            const exercice = req.body as Exercice
            
            if (!exercice) {
                return res.status(400).json({ message: "Invalid exercice structure" })
            }
            await this.exerciceService.createExercice(exercice)

            res.status(201).json("nouveaux exercice ajouté")
        } catch (err) {
            console.error("createExercice error:", err)
            res.status(400).json({ message: "Add Request failed", error: err })
        }
    }

    async modifyExercice(req: Request, res: Response){
        try {
            const exerciceid = Number(req.params.id)
            if (isNaN(exerciceid)) {
                return res.status(400).json({ message: "Invalid exercice id" })
            }
            const exercice = req.body as Exercice
            await this.exerciceService.modifyExercice(exerciceid, exercice)
            res.status(201).json(`exercice : ${exerciceid} modifié`)
        } catch(err){
            console.error("modifyExercice error:", err)
            res.status(400).json({message: "Modify Request failed", error: err})
        }
    }

    async delExercice(req: Request, res: Response){
        try{
            const exerciceid = Number(req.params.id)
            if (isNaN(exerciceid)) {
                return res.status(400).json({ message: "Invalid exercice id" })
            }
            await this.exerciceService.deleteExercice(exerciceid)
            res.status(204).json("exercice supprimé")
        } catch (err){
            console.error("deleteExercice error:", err)
            res.status(400).json({message: "Delete Request failed", error: err})
        }
    }

    buildRouter(): Router{
        const router = Router()

        router.post("/create-exercice", RoleAuth([Roles.admin]),  this.newExercice.bind(this))
        router.put("/modify-exercice/:id", RoleAuth([Roles.admin]), this.modifyExercice.bind(this))
        router.delete("/delete-exercice/:id", RoleAuth([Roles.admin]), this.delExercice.bind(this))
        return router
    }
}