import { User } from "./user.interface"

export interface Seance{
    user: User
    calories: number
    date: Date
    temps: number
}