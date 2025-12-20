export enum Roles{
    user = 1,
    proprietaire = 2,
    admin = 3
}

export interface User{
    id: number
    name: string
    email: string
    password: string
    role?: Roles
    actif?: boolean
    points?: number
}