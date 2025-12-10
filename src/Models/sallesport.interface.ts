import { SalleEntrainement } from "./salleentrainement.interface"

export interface SalleDeSport{
    id: number
    nom: string
    adresse: string
    numtel: number
    description: string
    activites: string[]
    salleEntrainement: SalleEntrainement[]
}