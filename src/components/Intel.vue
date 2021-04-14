<template>
  <div class="intel"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Intel extends Vue {
  mounted(): void {
    // https://restcountries.eu/rest/v2/name/{name}
    console.log(this.$route.params.code);
  }
}
</script>
<style scoped>
.intel {
  background-color: black;
  height: 100vh;
  width: 100%;
}
</style>
