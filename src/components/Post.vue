<template>
  <router-link to="/">
    <div class="post"><p>post</p></div>
  </router-link>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Post extends Vue {}
</script>

<style scoped>
.post {
  width: 100%;
  height: 100vh;
  background-color: black;
  overflow: hidden;
}
p {
  color: white;
  text-align: center;
}
</style>
