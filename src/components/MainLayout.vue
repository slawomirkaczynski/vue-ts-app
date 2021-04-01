<template>
  <PostCard />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "@/components/NavBar.vue";
import PostCard from "@/components/PostCard.vue";

@Component({
  components: {
    NavBar,
    PostCard,
  },
})
export default class MainLayout extends Vue {}
</script>
