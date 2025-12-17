import { Defis } from "./defis.interface";
import { Seance } from "./seance.interface";
import { User } from "./user.interface";

export interface ParticipationDefi{
    id: number
    user: User
    defi: Defis
    seance: Seance
    status: string
}