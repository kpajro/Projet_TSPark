import { Seance } from "./seance.interface"

export enum Roles{
    user,
    proprietaire,
    admin
}

export interface User{
    name: string
    role: Roles
    actif: boolean
    seances: Seance[]
}