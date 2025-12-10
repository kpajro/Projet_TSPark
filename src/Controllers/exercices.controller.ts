import { Request, Response, Router } from "express"
import { Exercice } from "../Models"
import { ExerciceService } from "../Services"

export class ExerciceController{
    readonly exerciceService: ExerciceService

    constructor(exerciceServ: ExerciceService){
        this.exerciceService = exerciceServ
    }

    async newExercice(req: Request, res: Response){
        try {
            const exercice = req.body as Exercice
            await this.exerciceService.createExercice(exercice)

            res.status(200).json("nouveaux exercice ajouté")
        } catch (err) {
            console.error("createExercice error:", err)
            res.status(400).json({ message: "Add Request failed", error: err })
        }
    }

    async modifyExercice(req: Request, res: Response){
        try {
            const exercice = req.body as Exercice
            const exerciceid = Number(req.params.id)
            await this.exerciceService.modifyExercice(exercice, exerciceid)
            res.status(200).json(`exercice : ${exerciceid} modifié`)
        } catch(err){
            console.error("modifyExercice error:", err)
            res.status(400).json({message: "Modify Request failed", error: err})
        }
    }

    async delExercice(req: Request, res: Response){
        try{
            const exerciceid = Number(req.params.id)
            await this.exerciceService.deleteExercice(exerciceid)
            res.status(200).json("exercice supprimé")
        } catch (err){
            console.error("deleteExercice error:", err)
            res.status(400).json({message: "Delete Request failed", error: err})
        }
    }

    buildRouter(): Router{
        const router = Router()

        router.post("/create-exercice", this.newExercice.bind(this))
        router.put("/modify-exercice/:id", this.modifyExercice.bind(this))
        router.delete("/delete-exercice/:id", this.delExercice.bind(this))
        return router
    }
}