import { SalleEntrainement } from "./salleentrainement.interface"

export interface SalleDeSport{
    nom: string
    adresse: string
    numtel: number
    description: string
    activites: string[]
    salleEntrainement: SalleEntrainement[]
}