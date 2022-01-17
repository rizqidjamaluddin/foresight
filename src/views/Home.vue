<template>
  <div class="m-6">
      <p>Pick an encounter:</p>
      <ul class="ml-2 list-disc list-inside">
          <li>
              <router-link :to="{name: 'encounters', params: {encounter: 'p1s'}}" class="link">P1S (Eric)</router-link>
          </li>
      </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>
<style scoped lang="css">

.link {
    @apply text-gray-700;
}

.link:hover {
    @apply text-blue-800 underline;
    text-decoration-color: theme('colors.blue.300');
    text-decoration-thickness: 2px;
}

</style>
