import { SalleDeSport } from "./sallesport.interface"
import { User } from "./user.interface"

export interface SalleEntrainement{
    id: number
    nom: string
    capacite: number
    equipements: string[]
    responsable: User
    salledesport: SalleDeSport
}