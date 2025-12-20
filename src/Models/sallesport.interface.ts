
import { User } from "./user.interface"

export interface SalleDeSport{
    id: number
    nom: string
    adresse: string
    capacite: number
    equipements: string[]
    responsable: User
    numtel: number
    description: string
    activites: string[]
    accepted: number
}