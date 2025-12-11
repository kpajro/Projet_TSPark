enum TypeRecompense{
    badge,
    recompense
}

export interface Recompense{
    id: number
    nom: string
    type: TypeRecompense
    points: number
}