import { User } from "./user.interface"

export interface SalleEntrainement{
    nom: string
    capacite: number
    equipements: string[]
    responsable: User
}