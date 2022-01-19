<template>
    <div>
        <Timeline :encounter="activeEncounter" :multiplier="multiplier" :generic="plan.config.generic">
            <ability-lane
                v-for="(lane, i) in plan.lanes"
                :key="lane.id"
                :icon="getAbilityIcon(lane.cls, lane.ability)"
                @addMarker="addMarker(lane.id, $event)"
            >
                <ability-marker
                    v-for="(marker, j) in getMarkersInLane(lane.id)"
                    :key="marker.id"
                    :time="marker.offset"
                    :ability="getAbility(lane.cls, lane.ability)"
                    :multiplier="multiplier"
                    :lock="plan.config.lock"
                    @delete="deleteMarker(marker.id)"
                    @changeTime="moveMarker(marker.id, $event)"
                />
            </ability-lane>
        </Timeline>
        <div class="status-bar">
            <div class="zoom-bar">
                <span @dblclick="resetZoom">{{ Math.ceil(multiplier * (100 / defaultZoom)) }}%</span>
                <button class="zoom-button" @click="zoomIn">&plus;</button>
                <button class="zoom-button" @click="zoomOut">&minus;</button>
            </div>
            <div class="toggle-bar">
                <label>
                    <input type="checkbox" v-model="plan.config.generic">
                    Use generic labels (&#8679;G)</label>
            </div>
            <div class="toggle-bar">
                <span class="lock-indicator" v-if="plan.config.lock">
                    Plan locked
                </span>
                <label>
                    <input type="checkbox" v-model="plan.config.lock">
                    Lock plan (&#8679;L)</label>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import Timeline from "@/components/Timeline.vue"
    import {Encounter, p1s, p2s, p3s} from "@/encounters/encounters"
    import AbilityLane from "@/components/AbilityLane.vue"
    import AbilityMarker from "@/components/AbilityMarker.vue"
    import {CombatClass, warrior} from "@/classes/tanks"


    const encounters: Record<string, Encounter> = {
        'p1s': p1s,
        'p2s': p2s,
        'p3s': p3s,
    }

    const classes: Array<CombatClass> = [
        warrior
    ]

    type Plan = {
        config: {
            generic: boolean,
            lock: boolean,
        },
        inc: {
            lane: number,
            marker: number,
        },
        lanes: Array<{
            id: number,
            cls: string,
            ability: string
        }>,
        markers: Array<{
            id: number,
            lane: number,
            offset: number
        }>,
    }

    const zoomLevels = [1, 1.5, 2, 2.5, 3, 4, 5, 8, 10, 15, 20, 30, 40]

    @Component({
        components: {AbilityMarker, AbilityLane, Timeline}
    })
    export default class Planner extends Vue {
        @Prop() encounter!: string
        @Prop() state!: string

        lastState = ''
        plan: Plan = {
            config: {
                generic: false,
                lock: false,
            },
            inc: {
                lane: 0,
                marker: 0,
            },
            lanes: [
                {
                    id: 1,
                    cls: 'WAR',
                    ability: 'Rampart'
                },
                {
                    id: 2,
                    cls: 'WAR',
                    ability: 'Vengeance'
                },
                {
                    id: 3,
                    cls: 'WAR',
                    ability: 'Holmgang'
                },
                {
                    id: 4,
                    cls: 'WAR',
                    ability: 'Thrill of Battle'
                },
                {
                    id: 5,
                    cls: 'WAR',
                    ability: 'Bloodwhetting'
                },
                {
                    id: 6,
                    cls: 'WAR',
                    ability: 'Shake It Off'
                },
                {
                    id: 7,
                    cls: 'WAR',
                    ability: 'Reprisal'
                },
                {
                    id: 8,
                    cls: 'WAR',
                    ability: 'Reprisal'
                },
            ],
            markers: [],
        };

        selected = null
        multiplier = 5
        defaultZoom = 5

        addMarker(laneId: number, offsetInPx: number) {
            if (this.plan.config.lock) return

            const targetTime = offsetInPx / this.multiplier
            this.plan.markers.push({
                id: this.plan.inc.marker,
                lane: laneId,
                offset: Math.floor(targetTime)
            })
            this.plan.inc.marker++
        }

        deleteMarker(markerId: number) {
            if (this.plan.config.lock) return

            this.plan.markers.splice(this.plan.markers.findIndex(({id}) => id === markerId), 1)
        }

        moveMarker(markerId: number, time: number) {
            if (this.plan.config.lock) return

            const marker = this.plan.markers.find(({id}) => id === markerId)
            if (marker) {
                marker.offset = Math.round(time)
            } else {
                console.warn('missing marker')
            }
        }

        mounted() {
            document.addEventListener('keydown', this.handleGlobalHotkeys)
        }

        beforeDestroy() {
            document.removeEventListener('keydown', this.handleGlobalHotkeys)
        }

        handleGlobalHotkeys(e: KeyboardEvent) {
            if (e.shiftKey && e.key === 'L') {
                this.plan.config.lock = !this.plan.config.lock
            }
            if (e.shiftKey && e.key === 'G') {
                this.plan.config.generic = !this.plan.config.generic
            }
        }

        zoomIn() {
            if (this.multiplier === zoomLevels.slice(-1)[0]) return
            this.multiplier = zoomLevels[zoomLevels.findIndex(val => val === this.multiplier) + 1]
        }

        zoomOut() {
            if (this.multiplier === zoomLevels[0]) return
            this.multiplier = zoomLevels[zoomLevels.findIndex(val => val === this.multiplier) - 1]
        }

        resetZoom() {
            this.multiplier = this.defaultZoom
        }

        getAbilityIcon(cls: string, ability: string) {
            return classes.find(({name}) => name === cls)?.abilities.find(({name}) => name === ability)?.icon
        }

        getAbility(cls: string, ability: string) {
            return classes.find(({name}) => name === cls)?.abilities.find(({name}) => name === ability)
        }

        getMarkersInLane(laneId: number) {
            return this.plan.markers.filter(({lane}) => lane === laneId)
        }

        get activeEncounter() {
            if (Object.keys(encounters).includes(this.encounter)) {
                return encounters[this.encounter]
            } else {
                return {}
            }
        }

        @Watch('$route', {deep: true, immediate: true})
        watchForUrlChange() {
            if (this.$route.query['s'] && this.$route.query['s'] !== this.lastState) {
                console.log('updating')
                this.lastState = this.$route.query['s'] as string
                try {
                    this.plan = JSON.parse(atob(this.$route.query['s'] as string))
                } catch (e) {
                }
            }
        }

        @Watch('plan', {immediate: true, deep: true})
        saveChanges() {
            const newState = btoa(JSON.stringify(this.plan))
            if (newState !== this.lastState) {
                this.lastState = newState
                this.$router.replace({query: {s: newState}})
            }
        }
    }
</script>
<style scoped lang="css">
.status-bar {
    @apply p-2 text-sm fixed top-0 right-0 flex items-center gap-6 font-bold flex-row-reverse left-1/2;
    z-index: 1;
}

.zoom-bar {
    @apply flex gap-2;
}

.zoom-button {
    @apply border border-gray-300;
    width: 1.2rem;
    height: 1.2rem;
    line-height: 1.2rem;
}

.toggle-bar {
    @apply font-normal;
}

.toggle-bar input {
    @apply relative top-0.5;
}

.lock-indicator {
    @apply bg-red-600 text-white font-semibold px-2 inline-block rounded-md mr-2;
}
</style>
