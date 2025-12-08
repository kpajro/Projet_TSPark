import { Exercice } from "./exercice.interface"
import { Recompense } from "./recompenses.interface"
import { Seance } from "./seance.interface"
import { User } from "./user.interface"



export interface Defis{
    nom: string
    difficulte: Number
    recompense: Recompense
    seance: Seance
    objectifs: string[]
    exercices: Exercice[]
    participants?: User[]
    debut: Date
    fin: Date
}