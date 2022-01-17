<template>
    <div class="lane">
        <div class="lane-header">
            <img :src="icon" />
        </div>
        <div class="lane-contents">
            <div class="lane-bg" @dblclick.prevent="addNewElement"></div>
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component({
    })
    export default class AbilityLane extends Vue {
        @Prop() icon!: string

        addNewElement(event: MouseEvent) {
            this.$emit('addMarker', event.offsetY)
        }
    }
</script>
<style scoped lang="css">
.lane {
    @apply relative inset-y-0 grid;
    /*background: rgba(0,50,255,0.1);*/
    width: 100px;
    grid-template-rows: 60px 1fr;
}

.lane:hover {
    background: rgba(0,50,255,0.05);
}

.lane-header {
    margin: 10px 0;
    height: 40px;
}

.lane-header img {
    @apply mx-auto;
    object-fit: contain;
    height: 100%;
    display: block;
}

.lane-contents {
    @apply relative;
}

.lane-bg {
    @apply absolute inset-0;
}
</style>
