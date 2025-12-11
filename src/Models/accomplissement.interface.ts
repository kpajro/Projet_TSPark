import { Recompense } from "./recompenses.interface"
import { User } from "./user.interface"

export interface Accomplissement{
    id: number
    user: User
    recompense: Recompense
}