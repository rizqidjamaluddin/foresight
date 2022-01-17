<template>
    <div class="marker" :style="styles">
        <div class="gridline"></div>
        <div class="label" :class="{'label-right': special}">
            <slot />
        </div>
    </div>
</template>
<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component({
    })
    export default class EventMarker extends Vue {

        @Prop() offset!: number
        @Prop({default: false, type: Boolean}) special!: boolean

        get styles() {
            return {
                'top': `${this.offset}px`,
                '--bg': '#D0021B',
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
    --bg: theme('colors.gray.200');
}

.marker::after {
    @apply absolute top-0 inset-x-0 h-1 bg-gray-200;
    content: " ";
    background: var(--bg);
}

.gridline {
    @apply w-screen h-px;
    background: rgba(0,0,0,0.1);
}

.label {
    @apply text-sm px-1 py-1 mr-4 bg-gray-200;
    background: var(--bg);
}

.label.label-right {
    @apply mr-0 ml-4;
}
</style>
