<template>
    <div class="timeline">
        <div class="events">
            <div class="markers">
                <event-marker v-for="(event, i) in leftSide"
                              :key="i"
                              :offset="event.timestamp * multiplier">
                    {{ event.event }}
                </event-marker>
            </div>
            <div :style="barStyles" class="bar"> </div>
            <div class="special-markers">
                <event-marker v-for="(event, i) in rightSide"
                              :key="i"
                              :special="isSpecial(event.event)"
                              :offset="event.timestamp * multiplier">
                    {{ event.event }}
                </event-marker>
            </div>
        </div>
        <div class="lanes">
            <slot />
            <div class="add-lane">
                <div class="add-label">
                    &CirclePlus;
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {Encounter, Event} from "@/encounters/encounters"
    import EventMarker from "@/components/EventMarker.vue"

    @Component({
        components: {EventMarker}
    })
    export default class Timeline extends Vue {
        @Prop() encounter!: Encounter
        @Prop() multiplier!: number

        emitNewLane() {
            this.$emit('addLane')
        }

        isSpecial(eventName: string) {
            return Object.keys(this.encounter.lookup).includes(eventName) && this.encounter.lookup[eventName].type === Event.TANK_BUSTER
        }

        get rightSide() {
            return this.encounter.timeline.filter(({ event }) => this.isSpecial(event))
        }

        get leftSide() {
            return this.encounter.timeline.filter(({ event }) => !this.isSpecial(event))
        }

        get totalLength() {
            return Math.max(... this.encounter.timeline.map(event => event.timestamp))
        }

        get barStyles() {
            return {
                height: `${this.totalLength * this.multiplier}px`,
            }
        }
    }
</script>
<style scoped lang="css">
    .timeline {
        @apply flex;
        max-width: 100vw;
        overflow-x: hidden;
    }

    .events {
        @apply px-6 pb-24 flex;
        isolation: isolate;
        padding-top: 60px;
    }

    .markers {
        @apply relative;
        width: 200px;
    }

    .bar {
        width: 5px;
        background: black;
    }

    .special-markers {
        @apply relative;
        width: 200px;
    }

    .lanes {
        @apply relative flex;
    }

    .add-lane {
        @apply w-20 relative inset-y-0;
        /*background: rgba(255,0,50,0.1);*/
    }

    .add-label {
        @apply py-2 text-center text-blue-800;
        font-size: 30px;
    }
</style>
