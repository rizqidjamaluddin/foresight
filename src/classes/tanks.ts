export type Ability = {
    name: string
    color: string
    duration: number
    cooldown: number
    icon?: string
}

export type CombatClass = {
    name: string
    abilities: Array<Ability>
}

const rampart: Ability = {
    name: 'Rampart',
    color: '#C25765',
    icon: '/icons/shared-rampart.png',
    duration: 20,
    cooldown: 90

}

export const warrior: CombatClass = {
    name: 'WAR',
    abilities: [
        rampart,
        {
            name: 'Vengeance',
            color: '#985585',
            icon: '/icons/war-vengeance.png',
            duration: 15,
            cooldown: 120
        }
    ]
}
