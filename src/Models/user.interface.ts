export enum Roles{
    user,
    proprietaire,
    admin
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