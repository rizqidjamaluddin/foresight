import {timeToSec} from "@/util/timeToSec"

export enum Event {
    GENERIC,
    ENRAGE,
    TANK_BUSTER,
    TANK_TETHERS,
    RAID_WIDE,
    RAID_WIDE_TICK,
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
    STACK_OR_SPREAD,
    DEBUFFS,
    POSITIONS,
    RESOLUTIONS,
}

export enum DamageType {
    MAGICAL,
    PHYSICAL
}

export type Encounter = {
    timeline: Array<{ timestamp: number, event: string }>,
    lookup: Record<string, {
        type: Event,
        alias?: string,
        magical?: true,
        actor?: true,
        special?: true,
    }>
}

function convertTimeline(input: Record<string, string>) {
    return Object.entries(input).reduce<Array<{ timestamp: number, event: string }>>((prev, [key, value]) => {
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
            type: Event.RAID_WIDE,
            magical: true,
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

export const p2s: Encounter = {
    "timeline": convertTimeline({
        "0:14": "Murky Depths",
        "0:24": "Doubled Impact",
        "0:38": "Sewage Deluge",
        "1:00": "Spoken/Winged Cataract",
        "1:20": "Coherence",
        "1:25": "Coherence(line stack)",
        "1:36": "Murky Depths",
        "1:43": "Ominous Bubbling",
        "1:54": "Shockwave",
        "2:13": "Predatory Avarice",
        "2:30": "Spoken/Winged Cataract",
        "2:38": "Hard Water",
        "2:50": "Channeling Flow",
        "3:06": "Great Typhoon",
        "3:20": "Doubled Impact",
        "3:30": "Murky Depths",
        "3:47": "Sewage Deluge",
        "4:05": "Shockwave",
        "4:17": "Kampeos Harma",
        "4:40": "Doubled Impact",
        "4:49": "Murky Depths",
        "5:03": "Channeling Overflow",
        "5:18": "Tainted Flood",
        "5:24": "Tainted Flood",
        "5:44": "Spoken/Winged Cataract",
        "6:03": "Predatory Avarice",
        "6:09": "Dissociation",
        "6:27": "Spoken/Winged Cataract",
        "6:40": "Dissociation",
        "6:54": "Sewage Eruption",
        "6:58": "Tainted Flood",
        "7:17": "Coherence",
        "7:21": "Coherence (line stack)",
        "7:31": "Doubled Impact",
        "7:40": "Murky Depths",
        "7:58": "Sewage Deluge",
        "8:15": "Channeling Overflow",
        "8:32": "Coherence",
        "8:36": "Coherence (line stack)",
        "8:57": "Dissociation",
        "9:10": "Sewage Eruption",
        "9:23": "Ominous Bubbling",
        "9:32": "Shockwave",
        "9:47": "Doubled Impact",
        "9:59": "Murky Depths",
        "10:11": "Murky Depths",
    }),
    "lookup": {}
}

export const p3s: Encounter = {
    "timeline": convertTimeline({
        "0:09": "Scorched Exaltation",
        "0:16": "Heat of Condemnation",
        "0:29": "Experimental Fireplume",
        "0:39": "Right/Left Cinderwing",
        "0:52": "Darkened Fire",
        // "1:03": "Brightened Fire #1",
        // "1:09": "Brightened Fire #2",
        // "1:10": "Brightened Fire #3",
        // "1:12": "Brightened Fire #4",
        // "1:14": "Brightened Fire #5",
        // "1:15": "Brightened Fire #6",
        // "1:17": "Brightened Fire #7",
        // "1:18": "Brightened Fire #8",
        "1:30": "Heat of Condemnation",
        "1:39": "Scorched Exaltation",
        "1:51": "Devouring Brand",
        "1:57": "Experimental Fireplume",
        "2:09": "Searing Breeze",
        "2:15": "Right/Left Cinderwing",
        "2:23": "Heat of Condemnation",
        "2:32": "Experimental Fireplume",
        "2:41": "Trail of Condemnation",

        // ADDS
        "2:55": "Adds spawn",
        "3:09": "Blazing Rain",
        "3:17": "Blazing Rain",
        "3:21": "Flames of Undeath",
        "3:22": "Blazing Rain",
        "3:30": "Fireglide Sweep",
        "3:34": "Blazing Rain",
        "3:40": "Blazing Rain",
        "3:44": "Fireglide Sweep",
        "3:50": "Blazing Rain",
        "3:58": "Blazing Rain",
        "4:06": "Blazing Rain",
        "4:11": "Blazing Rain",
        "4:12": "Flames of Undeath",
        // "???": "Adds Enrage",
        // "4:12": "Boss targetable",
        "4:28": "Dead Rebirth",
        "4:47": "Heat of Condemnation",
        "5:02": "Fledling Flight",
        // "5:11": "Markers disappear",
        "5:26": "Experimental Gloryplume",
        // "5:37": "Plume #1",
        // "5:38": "Plume #2",
        // "5:39": "Plume #3",
        // "5:40": "Plume #4",
        // "5:41": "Plume #5 (mid)",
        "5:44": "Gloryplume",

        // FOUNTAINS
        "5:56": "Fountain of Fire",
        "6:05": "Sun's Pinion",
        // "6:14": "Fountain of Death",
        "6:22": "Fireglide",
        "6:29": "Scorched Exaltation",
        "6:37": "Scorched Exaltation",
        "6:47": "Heat of Condemnation",

        // FIRESTORMS
        "7:02": "Firestorms of Asphodelos",
        "7:10": "Flames of Asphodelos",
        "7:19": "Blazing Rain",
        // "7:19": "Flame #1",
        // "7:20": "Flame #2",
        // "7:21": "Flame #3",
        "7:24": "Blazing Rain",
        "7:25": "Ashplume",
        "7:28": "Flames of Asphodelos",
        // "7:37": "Flame #1",
        // "7:38": "Flame #2",
        // "7:39": "Flame #3",
        "7:41": "Storms of Asphodelos",
        // "7:49": "Beacons of Asphodelos", ???
        "7:52": "Darkblaze Twister",
        "8:02": "Puddles",
        "8:04": "Puddles",
        "8:05": "Blazing Rain",
        "8:06": "Puddles",
        // "8:06": "Experimental Ashplumes",
        "8:07": "Puddles",
        "8:11": "Blazing Rain",
        "8:12": "Twister knockback",
        "8:19": "Ashplume",
        "8:21": "Scorched Exaltation",
        "8:33": "Death's Toll",
        "8:42": "Fledling Flight",
        "8:48": "Life's Agonies",
        // "8:58": "Ashen Eye",
        "9:19": "Experimental Gloryplume",
        "9:31": "Gloryplume",
        "9:34": "Trail of Condemnation",
        "9:53": "Devouring Brand",
        "10:11": "Searing Breeze",
        "10:17": "Right/Left Cinderwing",
        "10:27": "Scorched Exaltation",
        "10:35": "Scorched Exaltation",
        "10:41": "Final Exaltation",
    }),
    "lookup": {
        "Scorched Exaltation": {
            type: Event.RAID_WIDE,
            special: true,
        },
        "Heat of Condemnation": {
            type: Event.TANK_TETHERS,
            special: true,
        },
        "Experimental Fireplume": {
            type: Event.SAFE_SPOT,
            alias: 'Fireplume'
        },
        "Blazing Rain": {
            type: Event.RAID_WIDE_TICK,
            magical: true
        },
        "Right/Left Cinderwing": {
            type: Event.SAFE_SIDE,
            alias: 'Cinderwing'
        },
        "Searing Breeze": {
            type: Event.PUDDLES,
        },
        'Flames of Undeath': {
            type: Event.RAID_WIDE,
        },
        'Dead Rebirth': {
            type: Event.RAID_WIDE,
        },
        "Experimental Gloryplume": {
            type: Event.SAFE_SPOT,
        },
        "Gloryplume": {
            type: Event.STACK_OR_SPREAD,
        },
        "Firestorms of Asphodelos": {
            type: Event.GENERIC,
            alias: 'Firestorms'
        },
        "Ashplume": {
            type: Event.STACK_OR_SPREAD
        },
        "Flames of Asphodelos": {
            type: Event.SAFE_SLICE,
            alias: 'Flames'
        },
        "Storms of Asphodelos": {
            type: Event.RESOLUTIONS,
            alias: 'Storms'
        },
        "Puddles": {
            type: Event.PUDDLES
        },
        "Twister knockback": {
            type: Event.KNOCKBACK,
        },
        "Death's Toll": {
            type: Event.DEBUFFS,
        },
        "Life's Agonies": {
            type: Event.RAID_WIDE,
            special: true,
        },
        "Trail of Condemnation": {
            type: Event.STACK_OR_SPREAD,
            alias: 'Divebomb'
        }
    }
}


/**
 * old version
 *
 *     "timeline": convertTimeline({
        "0:08": "Scorched Exaltation",
        "0:16": "Heat of Condemnation",
        "0:28": "Experimental Fireplume",
        "0:38": "Right/Left Cinderwing",
        "0:52": "Darkened Fire",
        // "1:03": "Brightened Fire #1",
        // "1:09": "Brightened Fire #2",
        // "1:10": "Brightened Fire #3",
        // "1:12": "Brightened Fire #4",
        // "1:14": "Brightened Fire #5",
        // "1:15": "Brightened Fire #6",
        // "1:17": "Brightened Fire #7",
        // "1:18": "Brightened Fire #8",
        "1:30": "Heat of Condemnation",
        "1:40": "Scorched Exaltation",
        "1:51": "Devouring Brand",
        "1:57": "Experimental Fireplume",
        "2:09": "Searing Breeze",
        "2:14": "Right/Left Cinderwing",
        "2:23": "Heat of Condemnation",
        "2:32": "Experimental Fireplume",
        "2:41": "Trail of Condemnation",
        "2:55": "Adds spawn",
        "3:09": "Blazing Rain",
        "3:17": "Blazing Rain",
        "3:21": "Flames of Undeath",
        "3:22": "Blazing Rain",
        "3:30": "Fireglide Sweep",
        "3:34": "Blazing Rain",
        "3:40": "Blazing Rain",
        "3:44": "Fireglide Sweep",
        "3:50": "Blazing Rain",
        "3:58": "Blazing Rain",
        "4:06": "Blazing Rain",
        "4:11": "Blazing Rain",
        "4:12": "Flames of Undeath",
        // "???": "Adds Enrage",
        // "4:12": "Boss targetable",
        "4:26": "Dead Rebirth",
        "4:45": "Heat of Condemnation",
        "4:59": "Fledling Flight",
        // "5:11": "Markers disappear",
        "5:24": "Experimental Gloryplume",
        // "5:37": "Plume #1",
        // "5:38": "Plume #2",
        // "5:39": "Plume #3",
        // "5:40": "Plume #4",
        // "5:41": "Plume #5 (mid)",
        "5:43": "Gloryplume",
        "5:54": "Fountain of Fire",
        "6:03": "Sun's Pinion",
        // "6:14": "Fountain of Death",
        "6:21": "Fireglide",
        "6:26": "Scorched Exaltation",
        "6:33": "Scorched Exaltation",
        "6:44": "Heat of Condemnation",
        "7:00": "Firestorms of Asphodelos",
        "7:08": "Flames of Asphodelos",
        "7:17": "Blazing Rain",
        // "7:19": "Flame #1",
        // "7:20": "Flame #2",
        // "7:21": "Flame #3",
        "7:22": "Blazing Rain",
        "7:23": "Ashplume",
        "7:26": "Flames of Asphodelos",
        // "7:37": "Flame #1",
        // "7:38": "Flame #2",
        // "7:39": "Flame #3",
        "7:40": "Storms of Asphodelos",
        // "7:49": "Beacons of Asphodelos", ???
        "7:49": "Darkblaze Twister",
        "8:00": "Puddles",
        "8:02": "Puddles",
        "8:03": "Blazing Rain",
        "8:05": "Puddles",
        // "8:06": "Experimental Ashplumes",
        "8:07": "Puddles",
        "8:11": "Blazing Rain",
        // "8:12": "Twister knockback",
        "8:17": "Ashplume",
        "8:18": "Scorched Exaltation",
        "8:31": "Death's Toll",
        "8:40": "Fledling Flight",
        "8:45": "Life's Agonies",
        // "8:58": "Ashen Eye",
        "9:17": "Experimental Gloryplume",
        "9:29": "Gloryplume",
        "9:50": "Trail of Condemnation",
        "9:51": "Devouring Brand",
        "10:08": "Searing Breeze",
        "10:15": "Right/Left Cinderwing",
        "10:25": "Scorched Exaltation",
        "10:33": "Scorched Exaltation",
        "10:41": "Final Exaltation",
    }),
 */
