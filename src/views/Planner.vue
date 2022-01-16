<template>
    <div>
        {{ encounter }}
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component({
    })
    export default class Planner extends Vue {
        @Prop() encounter!: string
        @Prop() state!: string
    }
</script>
