<template>
    <div>
        <Timeline :encounter="activeEncounter" :multiplier="multiplier">
            <ability-lane
                v-for="(lane, i) in plan.lanes"
                :key="lane.id"
                :icon="getAbilityIcon(lane.cls, lane.ability)"
                @addMarker="addMarker(lane.id, $event)">
                <ability-marker
                    v-for="(marker, j) in getMarkersInLane(lane.id)"
                    :key="marker.id"
                    :time="marker.offset"
                    :ability="getAbility(lane.cls, lane.ability)"
                    :multiplier="multiplier"
                    @delete="deleteMarker(marker.id)"
                    @changeTime="moveMarker(marker.id, $event)"
                />
            </ability-lane>
        </Timeline>
        <div class="status-bar">
            <div class="zoom-bar">
                <span @dblclick="resetZoom">{{ Math.ceil(multiplier * (100 / defaultZoom))}}%</span>
                <button class="zoom-button" @click="zoomIn">&plus;</button>
                <button class="zoom-button" @click="zoomOut">&minus;</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import Timeline from "@/components/Timeline.vue"
    import {Encounter, p1s} from "@/encounters/encounters"
    import AbilityLane from "@/components/AbilityLane.vue"
    import AbilityMarker from "@/components/AbilityMarker.vue"
    import {CombatClass, warrior} from "@/classes/tanks"


    const encounters: Record<string, Encounter> = {
        'p1s': p1s
    }

    const classes: Array<CombatClass> = [
        warrior
    ]

    type Plan = {
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

    const zoomLevels = [1, 2, 3, 5, 8, 10, 20, 40]

    @Component({
        components: {AbilityMarker, AbilityLane, Timeline}
    })
    export default class Planner extends Vue {
        @Prop() encounter!: string
        @Prop() state!: string

        plan: Plan = {
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
                }
            ],
            markers: [],
        };

        selected = null
        multiplier = 5
        defaultZoom = 5

        addMarker(laneId: number, offsetInPx: number) {
            const targetTime = offsetInPx / this.multiplier
            this.plan.markers.push({
                id: this.plan.inc.marker,
                lane: laneId,
                offset: Math.floor(targetTime)
            })
            this.plan.inc.marker++
        }

        deleteMarker(markerId: number) {
            this.plan.markers.splice(this.plan.markers.findIndex(({id}) => id === markerId), 1)
        }

        moveMarker(markerId: number, time: number) {
            const marker = this.plan.markers.find(({ id }) => id === markerId)
            if (marker) {
                marker.offset = time
            } else {
                console.warn('missing marker')
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
    }
</script>
<style scoped lang="css">
.status-bar {
    @apply p-2 text-sm fixed top-0 right-0 flex items-center gap-2 font-bold flex-row-reverse left-1/2;
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
</style>
