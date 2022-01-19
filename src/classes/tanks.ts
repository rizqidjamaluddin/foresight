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

const tankShared: Array<Ability> = [
    {
        name: 'Rampart',
        color: '#C25765',
        icon: '/icons/shared-rampart.png',
        duration: 20,
        cooldown: 90,
    },
    {
        name: 'Reprisal',
        color: '#550891',
        icon: '/icons/shared-reprisal.png',
        duration: 10,
        cooldown: 60,
    }
]

export const warrior: CombatClass = {
    name: 'WAR',
    abilities: [
        ... tankShared,
        {
            name: 'Vengeance',
            color: '#985585',
            icon: '/icons/war-vengeance.png',
            duration: 15,
            cooldown: 120.
        },
        {
            name: 'Holmgang',
            color: '#C95115',
            icon: '/icons/war-holmgang.png',
            duration: 10,
            cooldown: 240,
        },
        {
            name: 'Thrill of Battle',
            color: '#387819',
            icon: '/icons/war-thrill.png',
            duration: 10,
            cooldown: 90,
        },
        {
            name: 'Equilibrium',
            color: '#B2DD23',
            icon: '/icons/war-equilibrium.png',
            duration: 15,
            cooldown: 60,
        },
        {
            name: 'Bloodwhetting',
            color: '#F8A13A',
            icon: '/icons/war-bloodwhetting.png',
            duration: 8,
            cooldown: 25,
        },
        {
            name: 'Shake It Off',
            color: '#323F54',
            icon: '/icons/war-shake.png',
            duration: 15,
            cooldown: 90,
        },
    ]
}
