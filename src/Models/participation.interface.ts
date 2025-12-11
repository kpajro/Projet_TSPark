import { Defis } from "./defis.interface";
import { User } from "./user.interface";

export interface ParticipationDefi{
    id: number
    user: User
    defi: Defis
}