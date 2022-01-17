<template>
    <div class="marker" :style="styles">
        <div class="gridline"></div>
        <div class="label" :class="{'label-right': special}" :style="labelStyles">
            <span class="symbol" v-html="symbols[0]"></span>
            <template v-if="generic && genericName">
                {{ genericName }}
            </template>
            <slot v-else/>
            <span class="symbol" v-html="symbols[1]"></span>
        </div>
    </div>
</template>
<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {Event} from "@/encounters/encounters"
    import {colord} from "colord"

    enum EventTypes {
        DMG,
        MECH
    }

    const lookup: Array<[Event, EventTypes, string, string | [string, string], (string | [string, string])?]> = [
        [Event.ENRAGE, EventTypes.DMG, 'Enrage', '#000000'],
        [Event.TANK_BUSTER, EventTypes.DMG, 'Tank buster', '#F5A623', '&bigtriangledown;'],
        [Event.RAID_WIDE, EventTypes.DMG, 'Raid-wide', '#D0021B'],
        [Event.SAFE_SPOT, EventTypes.MECH, 'Safe spot', '#7ED321'],
        [Event.SAFE_SIDE, EventTypes.MECH, 'Safe side', '#7ED321'],
        [Event.SAFE_SLICE, EventTypes.MECH, 'Safe slice', '#7ED321', '&Otimes;'],
        [Event.GET_OUT, EventTypes.MECH, 'Get out', '#7ED321', ['&LessLess;', '&GreaterGreater;']],
        [Event.GET_IN, EventTypes.MECH, 'Get in', '#7ED321', ['&GreaterGreater;', '&LessLess;']],
        [Event.KNOCKBACK, EventTypes.MECH, 'Knockback', '#7ED321'],
        [Event.PUDDLES, EventTypes.MECH, 'Puddles', '#F8E71C'],
        [Event.BAIT, EventTypes.MECH, 'Bait', '#F8E71C'],
        [Event.FLARE, EventTypes.DMG, 'Flare', '#50E3C2'],
        [Event.STACK, EventTypes.DMG, 'Stack', '#F5A623'],
        [Event.FLARE_OR_STACK, EventTypes.DMG, 'Flare / stack', ['#50E3C2', '#F5A623']],
        [Event.POSITIONS, EventTypes.MECH, 'Positions', '#1B3759'],
    ]

    @Component({})
    export default class EventMarker extends Vue {

        @Prop() offset!: number
        @Prop() type!: Event
        @Prop() generic!: boolean
        @Prop({default: false, type: Boolean}) special!: boolean

        get backgroundColor() {
            const match = lookup.find(([key]) => this.type === key)
            if (match) {
                if (Array.isArray(match[3])) {
                    return `linear-gradient(90deg, ${match[3][0]}, ${match[3][1]})`
                } else {
                    return match[3]
                }
            } else {
                return "#9ca3af"
            }
        }

        get textColor() {
            const match = lookup.find(([key]) => this.type === key)
            if (!match) return 'black'

            if (Array.isArray(match[3])) {
                return colord(match[3][0]).isDark() ? 'white' : 'black'
            } else {
                return colord(match[3]).isDark() ? 'white' : 'black'
            }
        }

        get borderRadius() {
            const match = lookup.find(([key]) => this.type === key)
            if (match && match[1] === EventTypes.MECH) {
                return '0 0 6px 6px'
            }
            return '0'
        }

        get symbols() {
            const match = lookup.find(([key]) => this.type === key)
            if(match && match[4]) {
                if (Array.isArray(match[4])) {
                    return [match[4][0], match[4][1]]
                } else {
                    if (this.special) {
                        return ['', match[4]]
                    } else {
                        return [match[4], '']
                    }
                }
            }
            return ['', ''];
        }

        get genericName() {
            const match = lookup.find(([key]) => this.type === key)
            if (match) {
                return match[2]
            }
            return false
        }

        get styles() {
            return {
                'top': `${this.offset}px`,
                'color': this.textColor,
                '--bg': this.backgroundColor,
            }
        }

        get labelStyles() {
            return {
                'borderRadius': this.borderRadius,
            }
        }

    }
</script>
<style scoped lang="css">
.marker {
    @apply absolute uppercase font-semibold text-center;
    left: 0;
    width: 200px;
    color: white;
    --bg: theme('colors.gray.400');
}

.marker::after {
    @apply absolute top-0 inset-x-0 h-1 bg-gray-200;
    content: " ";
    background: var(--bg);
}

.gridline {
    @apply w-screen h-px;
    background: rgba(0, 0, 0, 0.1);
}

.label {
    @apply text-sm px-1 py-1 mr-4 bg-gray-200;
    background: var(--bg);
}

.label.label-right {
    @apply mr-0 ml-4;
}
</style>
