import { Recompense } from "./recompense.interface"



export interface Defis{
    id: number
    nom: string
    difficulte: Number
    recompense: Recompense
    objectifs: string[]
    byUser: boolean
    debut: Date
    fin: Date
}