import {timeToSec} from "@/util/timeToSec"

export enum Event {
    GENERIC,
    ENRAGE,
    TANK_BUSTER,
    RAID_WIDE,
    SAFE_SPOT,
    SAFE_SIDE,
    SAFE_SLICE,
    GET_OUT,
    GET_IN,
    KNOCKBACK,
    PUDDLES,
    BAIT,
    FLARE,
    STACK,
    FLARE_OR_STACK,
    POSITIONS,
}

export enum DamageType {
    MAGICAL,
    PHYSICAL
}
export type Encounter = {
    timeline: Array<{timestamp: number, event: string}>,
    lookup: Record<string, {
        type: Event
        damageType?: DamageType
        special?: true
    }>
}

function convertTimeline(input: Record<string, string>) {
    return Object.entries(input).reduce<Array<{timestamp: number, event: string}>>((prev, [key, value]) => {
        prev.push({
            timestamp: timeToSec(key),
            event: value
        })
        return prev
    }, []).sort((a, b) => a.timestamp < b.timestamp ? -1 : 1)
}

export const p1s: Encounter = {
    "timeline": convertTimeline({
        "0:13": "Heavy Hand",
        "0:21": "Aetherial Shackles",
        "0:31": "Warden's Wrath",
        "0:58": "Gaoler's Flail",
        "1:10": "Pitiless Flail of Grace/Purgation",
        "1:30": "Gaoler's Flail",
        "1:44": "Warden's Wrath",
        "1:58": "Intemperance",
        "2:13": "Intemperate Torment",
        "2:21": "Warden's Wrath",
        "2:31": "Warden's Wrath",
        "2:45": "Pitiless Flail of Grace/Purgation",
        "3:07": "Shining Cells",
        "3:28": "Aetherflail",
        "3:43": "Pitiless Flail of Grace/Purgation",
        "4:03": "Aetherflail",
        "4:13": "Shackles of Time",
        "4:23": "Heavy Hand",
        "4:37": "Slam Shut",
        "4:53": "Fourfold Shackles",
        "5:28": "Warden's Wrath",
        "5:41": "Intemperance",
        "5:57": "Intemperate Torment",
        "6:13": "Gaoler's Flail",
        "6:29": "Warden's Wrath",
        "6:47": "Shining Cells",
        "7:03": "Pitiless Flail of Grace/Purgation",
        "7:21": "Warden's Wrath",
        "7:32": "Aetherial Shackles",
        "7:44": "Aetherchain",
        "7:52": "Aetherchain",
        "8:04": "Warden's Wrath",
        "8:25": "Aetherflail",
        "8:43": "Aetherflail",
        "9:00": "Aetherflail",
        "9:19": "Warden's Wrath",
        "9:29": "Warden's Wrath",
        "9:38": "Warden's Wrath",
        "9:58": "Lethe"
    }),
    "lookup": {
        "Heavy Hand": {
            type: Event.TANK_BUSTER,
            special: true,
        },
        "Warden's Wrath": {
            type: Event.RAID_WIDE,
        },
        "Gaoler's Flail": {
            type: Event.SAFE_SPOT
        },
        "Pitiless Flail of Grace/Purgation": {
            type: Event.FLARE_OR_STACK,
            special: true,
        },
        "Aetherchain": {
            type: Event.SAFE_SPOT
        },
        "Aetherial Shackles": {
            type: Event.POSITIONS
        },
        "Shining Cells": {
            type: Event.RAID_WIDE
        },
        "Aetherflail": {
            type: Event.SAFE_SLICE
        },
        "Slam Shut": {
            type: Event.RAID_WIDE
        },
        "Fourfold Shackles": {
            type: Event.POSITIONS
        },
        "Lethe": {
            type: Event.ENRAGE
        }
    }
}
