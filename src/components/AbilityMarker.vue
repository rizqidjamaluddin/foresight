<template>
    <div class="marker"
         :style="styles"
         @mousedown.prevent="handleDown"
         @dblclick.prevent="handleDoubleClick"
         :title="time"
    >
        <div class="marker-bg" :style="bgStyles"></div>
        <div class="marker-body" :style="bodyStyles">
        </div>
        <img :src="normalizeAsset(ability.icon)" class="marker-icon" />
        <div class="marker-lock" v-if="lock">&#128274;</div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Ref, Vue} from 'vue-property-decorator';
    import {Ability} from "@/classes/tanks"

    @Component({
    })
    export default class AbilityMarker extends Vue {
        @Prop() time!: number
        @Prop() multiplier!: number
        @Prop() lock!: boolean
        @Prop() globalLock!: boolean

        @Prop() ability!: Ability

        dragging = false
        dragStart = 0
        dragDelta = 0
        dragHorizontalStart = 0
        willDelete = false

        normalizeAsset(path: string) {
            return process.env.BASE_URL +  path
        }


        handleDown(event: MouseEvent) {
            if (this.lock || this.globalLock) return

            this.dragging = true
            this.dragStart = event.pageY
            this.dragHorizontalStart = event.pageX
            this.dragDelta = 0
            this.willDelete = false
            document.addEventListener('mousemove', this.handleMove, {passive: false})
            document.addEventListener('mouseup', this.handleUp, {passive: false})
        }

        handleUp(event: MouseEvent) {
            if (this.willDelete) {
                this.$emit('delete')
            } else {
                this.$emit('changeTime', this.time + ((event.pageY - this.dragStart) / this.multiplier))
            }


            this.dragging = false
            this.dragDelta = 0
            this.willDelete = false
            document.removeEventListener('mousemove', this.handleMove)
            document.removeEventListener('mouseup', this.handleUp)

        }

        handleMove(event: MouseEvent) {
            this.dragDelta = event.pageY - this.dragStart
            this.willDelete = Math.abs(this.dragHorizontalStart - event.pageX) > 60
        }

        handleDoubleClick(event: MouseEvent) {
            this.$emit('lock')
        }

        get styles() {
            return {
                top: `${this.time * this.multiplier}px`,
                height: `${this.ability.cooldown * this.multiplier}px`,
                transform: `translate3d(0px,${this.dragDelta}px, 0px)`,
                opacity: this.willDelete ? '0' : '1',
            }
        }

        get bgStyles() {
            return {
                background: this.ability.color,
                boxShadow: !this.lock ? '' : `0 0 0 2px white, 0 0 0 4px ${this.ability.color}`,
                opacity:  0.25,
            }
        }

        get bodyStyles() {
            return {
                height: `${this.ability.duration * this.multiplier}px`,
                background: this.ability.color
            }
        }
    }
</script>
<style scoped lang="css">
.marker {
    @apply absolute;
    left: 20px;
    width: 60px;
    height: 150px;
    user-select: none;
    transition: opacity 0.2s;
}
.marker-bg {
    @apply absolute inset-0;
    /*opacity: 0.2;*/
}

.marker-body {
    @apply absolute top-0 inset-x-0;
}

.marker-icon {
    @apply relative;
    top: 18px;
    left: 18px;
    width: 24px;
    height: 24px;
}

.marker-lock {
    @apply absolute;
    top: -12px;
    font-size: 16px;
    left: -8px;
    pointer-events: none;
}
</style>
