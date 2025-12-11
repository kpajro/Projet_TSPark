import { User } from "./user.interface"

export interface Seance{
    id: number
    user: User
    calories: number
    date: Date
    temps: number
}