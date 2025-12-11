import { Exercice } from "./exercice.interface"
import { Recompense } from "./recompenses.interface"
import { SalleDeSport } from "./sallesport.interface"
import { Seance } from "./seance.interface"
import { User } from "./user.interface"



export interface Defis{
    id: number
    nom: string
    difficulte: Number
    recompense: Recompense
    objectifs: string[]
    exercices: Exercice[]
    participants?: User[]
    byUser: boolean
    debut: Date
    fin: Date
}